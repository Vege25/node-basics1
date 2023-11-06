const users = [
  {
    user_id: 260,
    username: 'VCHar',
    password: '********',
    email: 'vchar@example.com',
    user_level_id: 1,
    created_at: '2020-09-12T06:56:41.000Z',
  },
  {
    user_id: 305,
    username: 'Donatello',
    password: '********',
    email: 'dona@example.com',
    user_level_id: 1,
    created_at: '2021-12-11T06:00:41.000Z',
  },
  {
    user_id: 3609,
    username: 'Anon5468',
    password: '********',
    email: 'x58df@example.com',
    user_level_id: 3,
    created_at: '2023-04-02T05:56:41.000Z',
  },
];
/**
 * Get all users
 *
 * @param {object} req
 * @param {object} res
 */
const getUsers = (req, res) => {
  res.json(users);
};
/**
 * Get one user with id
 *
 * @param {object} req
 * @param {object} res
 */
const getUserById = (req, res) => {
  const { id } = req.params;
  const item = users.find((element) => element.user_id == id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: 'User not found' });
  }
};
/**
 * Create one User
 *
 * @param {object} req
 * @param {object} res
 */
const postUser = (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201);
  res.json('user added: ', newUser);
};
/**
 * Update one user with id
 *
 * @param {object} req
 * @param {object} res
 */
const putUseraById = (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const i = users.findIndex((item) => item.user_id == id);
  if (i != -1) {
    users[i] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404);
    res.json({ message: 'User not found' });
  }
};
/**
 * Delete one user with id
 *
 * @param {object} req
 * @param {object} res
 */
const deleteUserById = (req, res) => {
  const { id } = req.params;
  const i = users.findIndex((item) => item.user_id == id);
  if (i != -1) {
    users.splice(i, 1);
    res.json({ message: 'User removed succesfully' });
  } else {
    res.status(404);
    res.json({ message: 'User not found' });
  }
};
export { getUsers, getUserById, postUser, putUseraById, deleteUserById };
