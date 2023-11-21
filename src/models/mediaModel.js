import pool from '../utils/database.mjs';
const promisePool = pool.promise();

const listAllMedia = async () => {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM bet_media_items`);
    return rows;
  } catch (e) {
    console.error('listAllMedia', e.message);
  }
};

const findMediaById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM bet_media_items WHERE media_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const addMedia = async (media) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO bet_media_items (user_id, filename, filesize, media_type, title, description) VALUES (?, ?, ?, ?, ?, ?);`,
      media
    );
    return rows;
  } catch (e) {
    console.error('addMedia', e.message);
  }
};

const updateMedia = async (media) => {
  console.log(media);
  try {
    const [rows] = await promisePool.execute(
      `UPDATE bet_media_items set filename = ?, title = ?, description = ? WHERE media_id = ?;`,
      media
    );
    return rows;
  } catch (e) {
    console.error('updateMedia', e.message);
  }
};

const deleteMedia = async (id) => {
  try {
    // remove comments to media post
    await promisePool.execute(`DELETE FROM bet_comments WHERE media_id = ?;`, [
      id,
    ]);

    // remove likes to media post
    await promisePool.execute(`DELETE FROM bet_likes WHERE media_id = ?;`, [
      id,
    ]);
    // remove media tags to media post
    await promisePool.execute(
      `DELETE FROM bet_media_item_tags WHERE media_id = ?;`,
      [id]
    );
    // remove media ratings to media post
    await promisePool.execute(`DELETE FROM bet_ratings WHERE media_id = ?;`, [
      id,
    ]);
    const [rows] = await promisePool.execute(
      `DELETE FROM bet_media_items WHERE media_id = ?;`,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('deleteMedia', e.message);
  }
};
export { listAllMedia, findMediaById, addMedia, updateMedia, deleteMedia };
