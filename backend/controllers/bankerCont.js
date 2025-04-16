import db from "../database/db.js"

export const getUsersAPI = async (req, res) => {
    try {
        const sql = `SELECT * FROM users WHERE userRole = 'customer'`;
        const [rows] = await db.query(sql);
        res.json({
            success: true,
            message: "Users fetched successfully",
            rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }

}

export const getAccountsAPI = async (req, res) => {
    const userId = req.query.id;
    try {
        const sql = `SELECT * FROM accounts WHERE user_id = ?`;
        const values = [userId];
        const [rows] = await db.query(sql, values);

        if (rows.length === 0) {
            res.status(404).json({ message: 'No transactions found for this user' });
            return;
        }

        res.json({
            success: true,
            message: "Accounts fetched successfully",
            rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching accounts' });
    }
}