import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { createUser } from '../db/userQueries';

export const signUp = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body();
    const password_hash = await bcrypt.hash(password, 10);
    await createUser(firstName, lastName, username, password_hash);
    res.status(201).redirect('/');
});
