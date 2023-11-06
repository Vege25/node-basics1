const mediaItems = [
  {
    media_id: 9632,
    filename: 'ffd8.jpg',
    filesize: 887574,
    title: 'Favorite drink',
    description: '',
    user_id: 1606,
    media_type: 'image/jpeg',
    created_at: '2023-10-16T19:00:09.000Z',
  },
  {
    media_id: 9626,
    filename: 'dbbd.jpg',
    filesize: 60703,
    title: 'Miika',
    description: 'My Photo',
    user_id: 3671,
    media_type: 'image/jpeg',
    created_at: '2023-10-13T12:14:26.000Z',
  },
  {
    media_id: 9625,
    filename: '2f9b.jpg',
    filesize: 30635,
    title: 'Aksux',
    description: 'friends',
    user_id: 260,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T20:03:08.000Z',
  },
  {
    media_id: 9592,
    filename: 'f504.jpg',
    filesize: 48975,
    title: 'Desert',
    description: '',
    user_id: 3609,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:59:05.000Z',
  },
  {
    media_id: 9590,
    filename: '60ac.jpg',
    filesize: 23829,
    title: 'Basement',
    description: 'Light setup in basement',
    user_id: 305,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:56:41.000Z',
  },
];

/**
 * Gets all media items
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */

const getMedia = (req, res) => {
  res.json(mediaItems);
};

/**
 * Get one media with id
 *
 * @param {object} req
 * @param {object} res
 */
const getMediaById = (req, res) => {
  const { id } = req.params;
  const item = mediaItems.find((element) => element.media_id == id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: 'Media not found' });
  }
};
/**
 * Update one media with id
 *
 * @param {object} req
 * @param {object} res
 */
const putMediaById = (req, res) => {
  const { id } = req.params;
  const updatedMediaItem = req.body;
  const i = mediaItems.findIndex((item) => item.media_id == id);
  if (i != -1) {
    mediaItems[i] = updatedMediaItem;
    res.json(updatedMediaItem);
  } else {
    res.status(404);
    res.json({ message: 'Media not found' });
  }
};
/**
 * Delete one media with id
 *
 * @param {object} req
 * @param {object} res
 */
const deleteMediaById = (req, res) => {
  const { id } = req.params;
  const i = mediaItems.findIndex((item) => item.media_id == id);
  if (i != -1) {
    mediaItems.splice(i, 1);
    res.json({ message: 'Media removed succesfully' });
  } else {
    res.status(404);
    res.json({ message: 'Media not found' });
  }
};
/**
 * Post media
 *
 * @param {object} req
 * @param {object} res
 */
const postMedia = (req, res) => {
  const newMediaItem = req.body;
  mediaItems.push(newMediaItem);
  res.status(201);
  res.json(newMediaItem);
};
export {
  mediaItems,
  getMedia,
  postMedia,
  getMediaById,
  putMediaById,
  deleteMediaById,
};
