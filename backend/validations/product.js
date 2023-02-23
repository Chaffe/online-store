import { body } from "express-validator";

export const productCreateValidation = [
    body('title', 'Enter the product title').isLength({ min: 3 }).isString(),
    body('price', "Enter the product price").isNumeric(),
    body('imageUrl', "Image URL is invalid").optional().isString()
]