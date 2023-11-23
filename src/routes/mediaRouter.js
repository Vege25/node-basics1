import express from 'express';
import {
  deleteMediaById,
  getMedia,
  getMediaById,
  postMedia,
  putMediaById,
} from '../controllers/mediaController.js';
import { authenticateToken } from '../middlewares/authentication.js';
import multer from 'multer';
import { body } from 'express-validator';
import upload from '../middlewares/upload.mjs';

const mediaRouter = express.Router();

mediaRouter
  .route('/')
  .get(getMedia)
  .post(
    authenticateToken,
    upload.single('file'),
    body('title').trim().isLength({ min: 3 }),
    body('description'),
    postMedia
  );

mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(putMediaById)
  .delete(deleteMediaById);

export default mediaRouter;
//uacd-examples-23 add basic jwt... branch authentication
