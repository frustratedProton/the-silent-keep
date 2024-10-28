import expressAsyncHandler from 'express-async-handler';
import { getAllMessages, createMessage } from '../db/messageQueries.js';
import CustomError from '../middleware/customErrorMiddleware.js';

export const renderAllMessages = async (req, res) => {
    const messages = await getAllMessages();
    console.log('User authenticated:', req.isAuthenticated());

    const formattedMessages = messages.map((message) => ({
        ...message,
        author: req.isAuthenticated()
            ? message.username
            : 'Someone mysterious...',
    }));
    
    console.log("formattedMessages: ", formattedMessages)

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

    res.render('new-message');
};

export const createNewMessage = expressAsyncHandler(async (req, res, next) => {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
        throw new CustomError('Title and content are required', 400);
    }

    await createMessage(title, content, userId);
    res.redirect('/messages');
});
