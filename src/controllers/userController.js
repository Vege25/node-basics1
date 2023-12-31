import { validationResult } from 'express-validator';
import {
  addUser,
  deleteUser,
  findUserById,
  listAllUsers,
  updateUser,
} from '../models/userModel.js';

/**
 * Get all users
 *
 * @param {object} req
 * @param {object} res
 */
const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    if (users.length < 1) {
      res.status(404);
      return;
    }
    res.json(users);
  } catch (e) {
    console.error('getUsers', e.message);
    next();
  }
};
/**
 * Get one user with id
 *
 * @param {object} req
 * @param {object} res
 */
const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};
/**
 * Create one User
 *
 * @param {object} req
 * @param {object} res
 */
const postUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    const error = new Error({ message: 'Invalid input' });
    error.status = 400;
    return next(error);
  }
  try {
    const data = [req.body.username, req.body.password, req.body.email, 2];

    const result = await addUser(data);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(201);
    res.json({ message: 'User added' });
  } catch (e) {
    console.error('postUser', e.message);
  }
};
/**
 * Update one user with id
 *
 * @param {object} req
 * @param {object} res
 */
const putUserById = async (req, res, next) => {
  try {
    const data = [
      req.body.username,
      req.body.password,
      req.body.email,
      parseInt(req.body.user_level_id),
      req.params.id,
    ];
    const result = await updateUser(data);
    if (!result) {
      const error = new Error({ message: 'Invalid input' });
      error.status = 400;
      return next(error);
    }
    res.json({
      message: 'user updated',
    });
  } catch (e) {
    console.error('putUserById', e.message);
  }
};
/**
 * Delete one user with id
 *
 * @param {object} req
 * @param {object} res
 */
const deleteUserById = async (req, res, next) => {
  try {
    const result = await deleteUser(req.params.id);
    if (!result) {
      const error = new Error({ message: 'Invalid input' });
      error.status = 400;
      return next(error);
    }
    res.status(200);
    res.json({
      message: 'user deleted',
    });
  } catch (e) {
    console.error('delete', e.message);
  }
};
export { getUsers, getUserById, postUser, putUserById, deleteUserById };
