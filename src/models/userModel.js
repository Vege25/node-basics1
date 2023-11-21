import pool from '../utils/database.mjs';
const promisePool = pool.promise();

const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute(`SELECT * FROM bet_users`);
    return rows;
  } catch (e) {
    console.error('listAllUsers', e.message);
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM bet_users WHERE user_id = ?',
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

const addUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      `INSERT INTO bet_users (username, password, email, user_level_id) VALUES (?, ?, ?, ?);`,
      user
    );
    return rows;
  } catch (e) {
    console.error('addUser', e.message);
  }
};

const updateUser = async (data) => {
  try {
    const [rows] = await promisePool.execute(
      `UPDATE bet_users set username = ?, email = ?, password = ?, user_level_id = ? WHERE user_id = ?;`,
      data
    );
    return rows;
  } catch (e) {
    console.error('updateUser', e.message);
  }
};

const deleteUser = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `DELETE FROM bet_users WHERE user_id = ?;`,
      [id]
    );
    return rows;
  } catch (e) {
    console.error('deleteUser', e.message);
  }
};
export { deleteUser, updateUser, addUser, findUserById, listAllUsers };
