import { body, validationResult } from 'express-validator';
import { getUserByUsernameOrEmail } from '../db/userQueries.js';
import { CustomConflictError } from './customErrorMiddleware.js';

export const validationSignUp = [
    body('firstName')
        .trim()
        .notEmpty()
        .withMessage('First Name is required')
        .isAlpha()
        .withMessage('First Name should only contain letters'),

    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last Name is required')
        .isAlpha()
        .withMessage('Last Name should only contain letters'),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('A valid username is required')
        .custom(async (username) => {
            const user = await getUserByUsernameOrEmail(username);
            if (Array.isArray(user) && user.length > 0) {
                // Ensure user is an array
                throw CustomConflictError('This username already exists');
            }
        }),

    body('email')
        .trim()
        .isEmail()
        .withMessage('A valid email is required')
        .custom(async (email) => {
            const user = await getUserByUsernameOrEmail(email);
            if (Array.isArray(user) && user.length > 0) {
                // Ensure user is an array
                throw CustomConflictError('This email is already registered');
            }
        }),

    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),

    body('passwordConfirmation')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),
];

export const validationSignIn = [
    body('login')
        .trim()
        .notEmpty()
        .withMessage('Username or email is required'),

    body('password').notEmpty().withMessage('Password is required'),
];

export const validationJoinClub = [
    body('passcode').notEmpty().withMessage('Passcode is required'),
];

export const validationBecomeAdmin = [
    body('passcode').notEmpty().withMessage('Admin passcode is required'),
];

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Changed status to 400 (Bad Request)
    }
    next();
};
