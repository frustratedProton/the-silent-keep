import { Router } from 'express';
import { validationSignUp } from '../middleware/validators.js';
import {
    signUp,
    renderSignUpForm,
    signIn,
    renderSignInForm,
    renderJoinClubForm,
    processJoinClub,
    logout,
    renderBecomeAdminForm,
    processAdminReq,
} from '../controllers/authController.js';
import {
    createNewMessage,
    renderAllMessages,
    renderNewMessageForm,
} from '../controllers/messageController.js';

const router = Router();

router.get('/auth/sign-up', renderSignUpForm);
router.post('/auth/sign-up', validationSignUp, signUp);

router.get('/auth/sign-in', renderSignInForm);
router.post('/auth/sign-in', signIn);

router.get('/logout', logout);

router.get('/join-club', renderJoinClubForm);
router.post('/join-club', processJoinClub);

router.get('/become-admin', renderBecomeAdminForm);
router.post('/become-admin', processAdminReq);

router.get('/', renderAllMessages);
router.get('/messages/new', renderNewMessageForm);
router.post('/messages', createNewMessage);

export default router;
