import express from 'express';
import { getMe, postLogin } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authentication.js';
const authRouter = express.Router();

authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
