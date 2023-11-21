import express from 'express';
import {
  deleteLike,
  getMediaLikeById,
  getUserLikeById,
  postLike,
} from '../controllers/likeController.js';
const likeRouter = express.Router();

likeRouter.route('/').post(postLike);

likeRouter.route('/:id').delete(deleteLike);

likeRouter.route('/media/:id').get(getMediaLikeById);
likeRouter.route('/user/:id').get(getUserLikeById);

export default likeRouter;
