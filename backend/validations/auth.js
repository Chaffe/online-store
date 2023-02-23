import { body } from 'express-validator';

export const loginValidation = [
    body('email', "Invalid email").isEmail(),
    body('password', "Password must be at least 5 symbols").isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', "Invalid email").isEmail(),
    body('password', "Password must be at least 5 symbols").isLength({ min: 5 }),
    body('fullName', "FullName must be at least 3 symbols").isLength({ min: 3 }),
    body('avatarUrl', "Invalid URL").optional().isURL(),
];
