import db from "../database/db.js";

export const depositAPI = async (req, res) => {

    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Enter a valid amount' });
    }
    try {

        const [lastTxnRows] = await db.execute(
            'SELECT balance FROM accounts WHERE user_id = ? ORDER BY transaction_time DESC LIMIT 1',
            [userId]
        );
        const prevBalance = lastTxnRows.length > 0 ? parseFloat(lastTxnRows[0].balance) : 0;
        const newBalance = prevBalance + parseFloat(amount);

        await db.execute(
            'INSERT INTO accounts (user_id, transaction_type, amount, balance) VALUES (?, ?, ?, ?)',
            [userId, 'deposit', amount, newBalance]
        );

        res.status(200).json({
            message: 'Deposit successful',
            balance: newBalance
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during deposit' });
    }
}

export const withdrawAPI = async (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Enter a valid amount' });
    }

    try {
        const [lastTxnRows] = await db.execute(
            'SELECT balance FROM accounts WHERE user_id = ? ORDER BY transaction_time DESC LIMIT 1',
            [userId]
        );

        const prevBalance = lastTxnRows.length > 0 ? parseFloat(lastTxnRows[0].balance) : 0;

        if (amount > prevBalance) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        const newBalance = prevBalance - parseFloat(amount);

        await db.execute(
            'INSERT INTO accounts (user_id, transaction_type, amount, balance) VALUES (?, ?, ?, ?)',
            [userId, 'withdraw', amount, newBalance]
        );

        res.status(200).json({
            message: 'Withdrawal successful',
            balance: newBalance
        });

    } catch (err) {
        console.error('Withdraw error:', err);
        res.status(500).json({ message: 'Server error during withdrawal' });
    }

}


export const getBalanceAPI = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const sql = `SELECT balance FROM accounts WHERE user_id = ? ORDER BY transaction_time DESC LIMIT 1`;
    const values = [userId];
    try {
        const [rows] = await db.execute(sql, values);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }
        const balance = rows[0].balance;
        res.status(200).json({
            message: 'Balance fetched successfully',
            balance: balance
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during balance fetch' });
    }
}
