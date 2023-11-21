import {
  addMedia,
  deleteMedia,
  listAllMedia,
  updateMedia,
  findMediaById,
} from '../models/mediaModel.js';

const sharp = require("sharp");

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
const postMedia = (req, res) => {
  try {
    const thumbnail = await sharp(req.file.path)
      .resize(500, 500)
      .png()
      .toFile("./thumbnails/" + req.file.Image);

    const data = [
      req.body.Brand,
      req.body.Model,
      req.body.Description,
      req.body.UserID,
      req.file.filename,
    ];

    const result = await addCar(data);
    if (result.affectedRows < 1) {
      return next(httpError("Invalid data", 400));
    }
    if (thumbnail) {
      if (req.body.redirectToProfile) {
        res.redirect("./myprofile");
      } else {
        res.json({
          message: "car added",
          CarID: result.insertId,
        });
      }
    }
  } catch (e) {
    console.error("car_post", e.message);
    next(catchError(e));
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
