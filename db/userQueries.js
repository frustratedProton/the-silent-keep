import pool from './pool.js';
// TODO: Need to change username from email and make it seperate field

export const createUser = async (
    firstName,
    lastName,
    email,
    username,
    passwordHash
) => {
    await pool.query(
        'INSERT INTO users (first_name, last_name, username, email,  password_hash, is_secret_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [firstName, lastName, username, email, passwordHash, false, false]
    );
};

export const getUserByUsernameOrEmail = async (login) => {
    const { rows } = await pool.query(
        'SELECT * FROM users WHERE username = $1 OR email = $1',
        [login]
    );
    return rows[0];
};

export const updateUserMembershipStatus = async (userId, isSecretMember) => {
    await pool.query('UPDATE users SET is_secret_member = $1 WHERE id = $2', [
        isSecretMember,
        userId,
    ]);
};

export const updateUserAdminStatus = async (userId, isAdmin) => {
    await pool.query('UPDATE users SET is_admin = $1 WHERE id = $2', [
        isAdmin,
        userId,
    ]);
};
