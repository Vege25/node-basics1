import express from 'express';
import {
  deleteMediaById,
  getMedia,
  getMediaById,
  postMedia,
  putMediaById,
} from '../controllers/mediaController.js';

const mediaRouter = express.Router();

mediaRouter.route('/').get(getMedia).post(postMedia);

mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(putMediaById)
  .delete(deleteMediaById);

export default mediaRouter;
