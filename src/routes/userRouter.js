import express from 'express';
import {
  deleteUserById,
  getUserById,
  getUsers,
  postUser,
  putUserById,
} from '../controllers/userController.js';
const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postUser);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(putUserById)
  .delete(deleteUserById);

export default userRouter;
