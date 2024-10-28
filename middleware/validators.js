import { body, validationResult } from 'express-validator';
import { getUserByUsernameOrEmail } from '../db/userQueries.js';

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
        .withMessage('First Name is required')
        .isAlpha()
        .withMessage('First Name should only contain letters'),

    body('username')
        .trim()
        .notEmpty()
        .withMessage('A valid username is required')
        .custom(async (username) => {
            const user = await getUserByUsernameOrEmail(username);
            if (user.length > 0) {
                throw CustomConflictError('This username already exists');
            }
        }),

    body('email')
        .trim()
        .isEmail()
        .withMessage('A valid email is required')
        .custom(async (email) => {
            const user = await getUserByUsernameOrEmail(email);
            if (user.length > 0) {
                throw CustomConflictError('This email is already registered');
            }
        }),

    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long'),

    body('passwordConfirmation')
        .custom((value, { req }) => value == req.body.password)
        .whitelist('Password doesnt match'),
];

// TODO: need to make error diplay more robust
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    next();
};
