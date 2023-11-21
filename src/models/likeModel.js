import pool from '../utils/database.mjs';
const promisePool = pool.promise();

const findMediaLikeById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT COUNT(*) AS Likes FROM bet_likes WHERE media_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const findUserLikeById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT COUNT(*) AS Likes FROM bet_likes WHERE user_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const addLike = async (data) => {
  try {
    console.log(data);
    const [rows] = await promisePool.execute(
      `INSERT INTO bet_likes (media_id, user_id) VALUES (?, ?);`,
      [data]
    );
    return rows;
  } catch (e) {
    console.error('addLike', e.message);
  }
};
const deleteLikeModel = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `DELETE FROM bet_likes WHERE like_id = ?;`,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('deleteUser', e.message);
  }
};
export { findMediaLikeById, findUserLikeById, addLike, deleteLikeModel };
