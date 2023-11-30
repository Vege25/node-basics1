import pool from '../utils/database.mjs';
const promisePool = pool.promise();

const login = async (username) => {
  try {
    const sql = `SELECT user_id, username, password, email, user_level_id
                 FROM bet_users WHERE username = ?`;
    const params = [username];
    const result = await promisePool.query(sql, params);
    const [rows] = result; // first item in result array is the data rows
    // console.log('login, user found?', rows[0]);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

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
    const sql = `INSERT INTO bet_users (username, email, password, user_level_id)
                VALUES (?, ?, ?, ?)`;
    // user level id defaults to 2 (normal user)
    const params = [user.username, user.email, user.password, 2];
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
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
export { deleteUser, updateUser, addUser, findUserById, listAllUsers, login };
