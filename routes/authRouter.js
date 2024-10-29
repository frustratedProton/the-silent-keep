import { Router } from 'express';
import {
    validationSignUp,
    validationSignIn,
    validationJoinClub,
    validationBecomeAdmin,
    handleValidationErrors,
} from '../middleware/validators.js';
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
import { logRequestBody } from '../middleware/logRequest.js';

const authRouter = Router();

authRouter.get('/sign-up', renderSignUpForm);
authRouter.post('/sign-up', validationSignUp, signUp);

authRouter.get('/sign-in', renderSignInForm);
authRouter.post('/sign-in', validationSignIn, signIn);

authRouter.get('/logout', logout);

authRouter.get('/join-club', renderJoinClubForm);
authRouter.post('/join-club', validationJoinClub, processJoinClub);

authRouter.get('/become-admin', renderBecomeAdminForm);
authRouter.post('/become-admin', validationBecomeAdmin, processAdminReq);

export default authRouter;
