import * as userQueries from '../db/userQueries.js';

export const getAllMessages = async (req, res) => {
    const msg = await userQueries.getAllMessages();
    res.render('messages', {msg})
}