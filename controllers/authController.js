import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import {
    createUser,
    getUserByUsernameOrEmail,
    updateUserAdminStatus,
    updateUserMembershipStatus,
} from '../db/userQueries.js';
import CustomError from '../middleware/customErrorMiddleware.js';

export const signUp = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;

    const password_hash = await bcrypt.hash(password, 10);
    try {
        await createUser(firstName, lastName, email, username, password_hash);
        res.status(201).redirect('/');
    } catch (error) {
        if (error.code === '23505') {
            return next(
                new CustomError('Username or email already exists', 400)
            );
        }
        next(error);
    }
});

export const renderSignUpForm = (req, res) => {
    res.render('index', {
        page: 'sign-up',
        pageTitle: 'Sign Up',
        user: req.user,
    });
};

export const signIn = asyncHandler(async (req, res, next) => {
    const { login, password } = req.body;
    const user = await getUserByUsernameOrEmail(login);
    console.log(user);
    if (!user) {
        return next(new CustomError('User not found'), 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        return next(new CustomError('Invalid credentials', 401));
    }

    req.login(user, (err) => {
        if (err) return next(err);
        res.redirect('/');
    });
});

export const renderSignInForm = (req, res) => {
    res.render('index', {
        page: 'sign-in',
        pageTitle: 'Sign In',
        user: req.user,
    });
};

export const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

export const processJoinClub = asyncHandler(async (req, res, next) => {
    const { passcode } = req.body;
    const uuId = req.user.id;

    if (passcode === process.env.CLUB_PASSCODE) {
        await updateUserMembershipStatus(uuId, true);
        res.redirect('/');
    } else {
        next(new CustomError('Invalid passcode', 403));
    }
});

export const renderJoinClubForm = (req, res) => {
    // res.render('index', {
    //     page: 'join-club',
    //     pageTitle: 'Join the Club',
    //     user: req.user,
    // });
    res.render('join-club');
};

export const processAdminReq = asyncHandler(async (req, res, next) => {
    const { passcode } = req.body;
    const uuid = req.user.id;

    if (passcode === process.env.ADMIN_PASSCODE) {
        await updateUserAdminStatus(uuid, true);
        res.redirect('/');
    } else {
        next(new CustomError('Invalid passcode', 403));
    }
});

export const renderBecomeAdminForm = (req, res) => {
    res.render('become-admin');
};
