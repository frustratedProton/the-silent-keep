import expressAsyncHandler from 'express-async-handler';
import {
    getAllMessages,
    createMessage,
    deleteMessageById,
} from '../db/messageQueries.js';
import CustomError from '../middleware/customErrorMiddleware.js';

export const renderAllMessages = async (req, res) => {
    const messages = await getAllMessages();
    const formattedMessages = messages.map((message) => ({
        ...message,
        author: req.isAuthenticated()
            ? message.username
            : 'Shadow',
    }));

    res.render('index', {
        page: 'messages',
        pageTitle: 'Messages',
        user: req.user,
        messages: formattedMessages,
    });
};

export const renderNewMessageForm = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/sign-in');
    }

    res.render('new-message', { user: req.user });
};

export const createNewMessage = expressAsyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
        throw new CustomError('Title and content are required', 400);
    }

    await createMessage(title, content, userId);
    res.redirect('/');
});

export const deleteMessage = expressAsyncHandler(async (req, res, next) => {
    try {
        if (!req.user || !req.user.is_admin) {
            return next(new CustomError('Unauthorized', 403));
        }

        const messageId = req.params.id;
        await deleteMessageById(messageId);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});
