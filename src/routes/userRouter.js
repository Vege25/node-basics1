import express from 'express';
import { body } from 'express-validator';
import {
  deleteUserById,
  getUserById,
  getUsers,
  postUser,
  putUserById,
} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body('password').trim().isLength({ min: 8 }),
    body('email').trim().isEmail(),
    postUser
  );

userRouter
  .route('/:id')
  .get(getUserById)
  .put(putUserById)
  .delete(deleteUserById);

export default userRouter;
