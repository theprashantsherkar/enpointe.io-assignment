import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database/db.js';

export const landing = (req, res) => {
    return res.json({
        message: "Welcome to the Bank API"
    })
};

export const registerAPI = async (req, res) => {
    const { username, email, role, password } = req.body;
    if (!username | !email | !role | !password) {
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (username, email, userRole, password) VALUES (?, ?, ?, ?)`;
    const values = [username, email, role, hashedPass];
    const isRegistered = await db.query(sql, values);
    if (isRegistered.affectedRows === 0) {
        return res.status(400).json({
            message: "User not registered"
        })
    }

    const token = jwt.sign({ id: isRegistered.insertId }, process.env.JWT_SECRET);

    return res.cookie("token", token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,

    }).json({
        success:true,
        message: "User registered successfully"
    })

}

export const BankerloginAPI = async (req, res) => {
    const { email, password } = req.body;
    if(!email | !password) {
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    const values = [email];
    const [rows] = await db.query(sql, values);

    if (rows.length === 0) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }
    const user = rows[0];

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        })
    }

    if (user.userRole !== "banker") {
        return res.status(400).json({
            success: false,
            message: "You are not a banker"
        })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    }).json({
        success: true,
        message: "User logged in successfully",
        user
    })

}

export const CustomerloginAPI = async (req, res) => {
    const { email, password } = req.body;
    if (!email | !password) {
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    const values = [email];
    const [rows] = await db.query(sql, values);

    if (rows.length === 0) {
        return res.status(400).json({
            success:false,
            message: "User not found"
        })
    }
    const user = rows[0];

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        return res.status(400).json({
            success:false,
            message: "Invalid credentials"
        })
    }
    if (user.userRole !== "customer") {
        return res.status(400).json({
            success: false,
            message: "You are not a customer"
        })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        secure:true,
        maxAge: 24 * 60 * 60 * 1000,
    }).json({
        success: true,
        message: "User logged in successfully",
        user
    })

}

export const logoutAPI = async (req, res) => {
    return res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "User logged out successfully"
    })
}

export const getUserAPI = async (req, res) => {
    const id = req.user.id;
    if (!id) {
        return res.status(401).json({
            message: "User not authenticated"
        })
    }

    const sql = `SELECT * FROM users WHERE id = ?`;
    const values = [id];
    const [rows] = await db.query(sql, values);
    if (rows.length === 0) {
        return res.status(400).json({
            message: "User not found"
        })
    }
    const user = rows[0];
    if(!user) {
        return res.status(400).json({
            message: "User not found"
        })
    }
    return res.json({
        success: true,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.userRole
        }
    })
}

export const changePasswordAPI = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            message: "User not authenticated"
        })
    }

    if (!oldPassword | !newPassword | !confirmPassword) {
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "Passwords do not match"
        })
    }
    const sql = `SELECT * from users WHERE id = ?`
    const values = [user.id];
    const [rows] = await db.query(sql, values);

    if (rows.length === 0) {
        return res.status(400).json({
            message: "User not found"
        })
    }

    const userData = rows[0];
    const hashedOldPassword = userData.password;

    const isMatched = await bcrypt.compare(oldPassword, hashedOldPassword);
    if (!isMatched) {
        return res.status(400).json({
            message: "Old password is incorrect"
        })
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const sql2 = `UPDATE users SET password = ? WHERE id = ?`;
    const values2 = [hashedNewPassword, user.id];
    await db.query(sql2, values2);

    return res.json({
        success: true,
        message: "Password changed successfully"
    })

}

