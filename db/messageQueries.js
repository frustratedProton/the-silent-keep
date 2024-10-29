import pool from './pool.js';

export const getAllMessages = async () => {
    const { rows } = await pool.query(`
        SELECT messages.*, users.username
        FROM messages
        JOIN users ON messages.user_id = users.id
    `);
    return rows;
};

export const createMessage = async (title, content, userId) => {
    await pool.query(
        'INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)',
        [title, content, userId]
    );
};

export const deleteMessageById = async (id) => {
    await pool.query('DELETE FROM messages WHERE id = $1', [id]);
};
