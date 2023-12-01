import express from 'express';
import {
  deleteLike,
  getMediaLikeById,
  getUserLikeById,
  postLike,
} from '../controllers/likeController.js';
const likeRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine admin Admin user level token needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @api {post} /postLike Add like
 * @apiVersion 1.0.0
 * @apiName PostLike
 * @apiGroup Likes
 * @apiPermission all
 *
 * @apiDescription Add a like
 *
 * @apiParam {String} media_id Id of the media. (In the request body)
 * @apiParam {String} user_id Id of the user. (In the request body)
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "media_id": 23,
 *      "user_id": 1
 *    }
 *
 * @apiSuccess {Object} like Like info.
 *
 */
likeRouter.route('/').post(postLike);

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine admin Admin user level token needed.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @api {delete} /:id Delete like
 * @apiVersion 1.0.0
 * @apiName DeleteLike
 * @apiGroup Likes
 * @apiPermission all
 *
 * @apiDescription Delete a like
 *
 * @apiParam {String} id Id of the Like.
 */
likeRouter.route('/:id').delete(deleteLike);

/**
 * @api {get} /:id Get like
 * @apiVersion 1.0.0
 * @apiName getMediaLikeById
 * @apiGroup Likes
 * @apiPermission all
 *
 * @apiDescription Get Media Like By Id
 *
 * @apiParam {String} id Id of the Like.
 */
likeRouter.route('/media/:id').get(getMediaLikeById);

/**
 * @api {get} /:id Get user like with id
 * @apiVersion 1.0.0
 * @apiName GetUserLikeById
 * @apiGroup Likes
 * @apiPermission all
 *
 * @apiDescription Get User Like By Id
 *
 * @apiParam {String} id Id of the Like.
 */
likeRouter.route('/user/:id').get(getUserLikeById);

export default likeRouter;
