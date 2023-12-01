import express from 'express';
import {
  deleteUserById,
  getUserById,
  getUsers,
  postUser,
  putUserById,
} from '../controllers/userController.js';
import { body } from 'express-validator';
const userRouter = express.Router();

/**
 * @api {get} / Get users
 * @apiVersion 1.0.0
 * @apiName getUsers
 * @apiGroup User
 * @apiPermission all
 *
 * @apiDescription Get all Users
 */
/**
 * @api {post} / Add User
 * @apiVersion 1.0.0
 * @apiName postUser
 * @apiGroup User
 * @apiPermission all
 *
 * @apiDescription Add a User
 *
 * @apiParam {String} email Email of the user. (In the request body)
 * @apiParam {String} username Username of the user. (In the request body)
 * @apiParam {String} password Password of the user. (In the request body)
 */
userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({ min: 3, max: 20 }).isAlphanumeric(),
    body('password').trim().isLength({ min: 8 }),
    postUser
  );

/**
 * @api {get} /:id Get one user
 * @apiVersion 1.0.0
 * @apiName getUserById
 * @apiGroup User
 * @apiPermission all
 *
 * @apiDescription Get User by id
 */
/**
 * @api {put} /:id Update user
 * @apiVersion 1.0.0
 * @apiName putUserById
 * @apiGroup User
 * @apiPermission all
 *
 * @apiDescription Update user by id
 */
/**
 * @api {delete} /:id Delete user
 * @apiVersion 1.0.0
 * @apiName deleteUserById
 * @apiGroup User
 * @apiPermission all
 *
 * @apiDescription Delete user by id
 */
userRouter
  .route('/:id')
  .get(getUserById)
  .put(putUserById)
  .delete(deleteUserById);

export default userRouter;
