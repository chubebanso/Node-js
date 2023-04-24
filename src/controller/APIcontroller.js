import pool from '../configs/connectDB'

let getAllUsers = async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    const rows = result.rows;
    return res.status(200).json({
        message: "Get all users",
        data: rows
    });
};

let createNewUser = async (req, res) => {
    let { first_name, last_name, email, address } = req.body;
    if (!first_name || !last_name || !email || !address) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`INSERT INTO users(first_name, last_name, email, address) VALUES ($1, $2, $3, $4)`,
        [first_name, last_name, email, address]);
    return res.status(201).json({
        message: "Create new user success",
    });
};
let UpdateUser = async (req, res) => {
    let { first_name, last_name, email, address, id } = req.body;
    if (!first_name || !last_name || !email || !address || !id) {
        return res.status(400).json({
            message: "Missing fields",
        });
    }
    await pool.query(`update users set first_name=$2,last_name=$3,email=$4,address=$5 where id=$1`,
        [id, first_name, last_name, email, address])
    return res.status(200).json({
        message: "Create new user success",
    });
}
let DeleteUser = async (req, res) => {
    let userId = req.params.id;
    if (!userId) {
        return res.status(400).json({
            message: "Missing fields",
        })
    }
    await pool.query(`delete from users where id=$1`, [userId]);
    return res.status(200).json({
        message: "Delete user success",
    });
}
module.exports = {
    getAllUsers,
    createNewUser,
    UpdateUser,
    DeleteUser
};
