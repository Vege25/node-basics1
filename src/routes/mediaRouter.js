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
const upload = multer({ dest: 'uploads/' });

const mediaRouter = express.Router();

/**
 * @api {get} / Get media
 * @apiVersion 1.0.0
 * @apiName getMedia
 * @apiGroup Media
 * @apiPermission all
 *
 * @apiDescription Get all Media
 */
/**
 * @api {post} /postMedia Add media
 * @apiVersion 1.0.0
 * @apiName postMedia
 * @apiGroup Media
 * @apiPermission all
 *
 * @apiDescription Add a Media
 */
mediaRouter
  .route('/')
  .get(getMedia)
  .post(authenticateToken, upload.single('file'), postMedia);

/**
 * @api {get} /:id Get one media
 * @apiVersion 1.0.0
 * @apiName getMediaById
 * @apiGroup Media
 * @apiPermission all
 *
 * @apiDescription Get Media by id
 */
/**
 * @api {put} /:id Update media
 * @apiVersion 1.0.0
 * @apiName putMediaById
 * @apiGroup Media
 * @apiPermission all
 *
 * @apiDescription Update Media by id
 */
/**
 * @api {delete} /:id Delete media
 * @apiVersion 1.0.0
 * @apiName deleteMediaById
 * @apiGroup Media
 * @apiPermission all
 *
 * @apiDescription Delete Media by id
 */
mediaRouter
  .route('/:id')
  .get(getMediaById)
  .put(putMediaById)
  .delete(deleteMediaById);

export default mediaRouter;
//uacd-examples-23 add basic jwt... branch authentication
