import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { login } from '../models/userModel.js';

const postLogin = async (req, res) => {
  const user = await login(req.body);
  console.log('postLogin:', user);
  try {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ message: 'logged in', token, user });
  } catch (e) {
    res.status(401).json({ e });
  }
};

const getMe = async (req, res) => {
  console.log('getMe', req.user);
  res.json(req.user);
};

export { postLogin, getMe };
