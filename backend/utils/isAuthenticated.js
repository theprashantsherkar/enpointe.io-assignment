import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token){
        return res.status(401).json({
            message: "You are not authenticated"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next();

    } catch(err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}