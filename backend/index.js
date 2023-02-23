import express from 'express';
import mongoose from "mongoose";

import { loginValidation, registerValidation } from "./validations/auth.js";
import { productCreateValidation } from "./validations/product.js";
import checkAuth from "./utils/checkAuth.js";

import { register, login, getMe } from "./controllers/UserController.js";

import { create } from './controllers/ProductController.js';

mongoose
    .connect("mongodb+srv://Chaffe:wwwwww@cluster0.ooqonha.mongodb.net/online-store?retryWrites=true&w=majority")
    .then(() => console.log('DB Connected'))
    .catch(() => console.log('DB Error'))

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/auth/login', loginValidation, login);

app.post('/auth/register', registerValidation, register);

app.get('/auth/me', checkAuth, getMe);

app.post('/products', checkAuth, productCreateValidation, create)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server started');
})