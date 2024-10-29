import { Router } from 'express';
import {
    createNewMessage,
    deleteMessage,
    renderAllMessages,
    renderNewMessageForm,
} from '../controllers/messageController.js';
import { ensureAuth } from '../middleware/adminAuthMiddleware.js';

const messageRouter = Router();

messageRouter.get('/', renderAllMessages);
messageRouter.get('/messages/new', renderNewMessageForm);
messageRouter.post('/messages', createNewMessage);
messageRouter.post('/messages/:id/delete', ensureAuth, deleteMessage);

export default messageRouter;
