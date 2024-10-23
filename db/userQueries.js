import pool from "./pool.js";

export const getAllMessages = async () => {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}