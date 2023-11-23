import {
  addMedia,
  deleteMedia,
  listAllMedia,
  updateMedia,
  findMediaById,
} from '../models/mediaModel.js';

/**
 * Gets all media items
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */
const getMedia = async (req, res, next) => {
  try {
    const media = await listAllMedia();
    if (media.length < 1) {
      res.status(404);
      return;
    }
    res.json(media);
  } catch (e) {
    console.error('getMedia', e.message);
  }
};

/**
 * Get one media with id
 *
 * @param {object} req
 * @param {object} res
 */
const getMediaById = async (req, res) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    res.json(media);
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
const postMedia = async (req, res) => {
  const { title, description } = req.body;
  const { filename, mimetype, size } = req.file;
  const user_id = req.user.user_id;
  if (filename && title && user_id) {
    const newMedia = { title, description, user_id, filename, mimetype, size };
    const result = await addMedia(newMedia);
    res.status(201);
    res.json({ message: 'New media item added.', ...result });
  } else {
    res.sendStatus(400);
  }
};

/**
 * Update one media with id
 *
 * @param {object} req
 * @param {object} res
 */
const putMediaById = async (req, res) => {
  const media = [
    req.body.filename,
    req.body.title,
    req.body.description,
    parseInt(req.params.id),
  ];
  if (media) {
    const result = await updateMedia(media);
    res.status(200);
    res.json(result);
  } else {
    res.status(400);
  }
};
/**
 * Delete one media with id
 *
 * @param {object} req
 * @param {object} res
 */
const deleteMediaById = async (req, res) => {
  try {
    const result = await deleteMedia(req.params.id);
    if (result.affectedRows < 1) {
      res.status(404);
      return;
    }
    res.status(200);
    res.json({
      message: 'car deleted',
    });
  } catch (e) {
    console.error('delete', e.message);
  }
};

export { getMedia, postMedia, getMediaById, putMediaById, deleteMediaById };
