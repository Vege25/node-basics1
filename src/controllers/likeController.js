import {
  addLike,
  deleteLikeModel,
  findMediaLikeById,
  findUserLikeById,
} from '../models/likeModel.js';

const getMediaLikeById = async (req, res) => {
  const media = await findMediaLikeById(req.params.id);
  if (media) {
    res.json(media);
  } else {
    res.sendStatus(404);
  }
};
const getUserLikeById = async (req, res) => {
  const user = await findUserLikeById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};
/**
 * Post media
 *
 * @param {object} req
 * @param {object} res
 */
const postLike = async (req, res) => {
  if (req.body) {
    const like = await addLike(req.body);
    console.log(like);
    res.status(201);
  } else {
    res.status(400);
  }
};
const deleteLike = async (req, res) => {
  try {
    const result = await deleteLikeModel(req.params.id);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(200);
    res.json({
      message: 'like deleted',
    });
  } catch (e) {
    console.error('delete', e.message);
  }
};
export { getUserLikeById, getMediaLikeById, postLike, deleteLike };
