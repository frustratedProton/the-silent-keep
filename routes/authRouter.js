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

const authRouter = Router();

authRouter.get('/sign-up', renderSignUpForm);
authRouter.post('/sign-up', validationSignUp, handleValidationErrors, signUp);

authRouter.get('/sign-in', renderSignInForm);
authRouter.post('/sign-in', validationSignIn, handleValidationErrors, signIn);

authRouter.get('/logout', logout);

authRouter.get('/join-club', renderJoinClubForm);
authRouter.post(
    '/join-club',
    validationJoinClub,
    handleValidationErrors,
    processJoinClub
);

authRouter.get('/become-admin', renderBecomeAdminForm);
authRouter.post(
    '/become-admin',
    validationBecomeAdmin,
    handleValidationErrors,
    processAdminReq
);

export default authRouter;
