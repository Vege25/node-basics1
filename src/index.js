import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getItems, getItemsById, postItem } from './items.js';
import {
  deleteMediaById,
  getMedia,
  getMediaById,
  mediaItems,
  postMedia,
  putMediaById,
} from './media.js';
import {
  deleteUserById,
  getUserById,
  getUsers,
  postUser,
  putUseraById,
} from './user.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// middleware
app.use((req, res, next) => {
  console.log('Time: ', Date.now(), req.method, req.url);
  next();
});

// dummy route
app.get('/kukkuu', (req, res) => {
  const myResponse = { message: 'Moro' };
  res.status(200);
  res.json(myResponse);
});

// dummy pug route
app.get('/:message', (req, res) => {
  const values = { title: 'Dummy REST API docs', message: req.params.message };
  res.render('home', values);
});

// example items api
app.get('/api/items', getItems);
app.get('/api/items/:id', getItemsById);
app.put('/api/items');
app.post('/api/items', postItem);
app.delete('/api/items');

// Media api endpoints
app.get('/api/media', getMedia);
app.get('/api/media/:id', getMediaById);
app.post('/api/media', postMedia);
app.put('/api/media/:id', putMediaById);
app.delete('/api/media/:id', deleteMediaById);

// Users api endpoints
app.get('/api/user', getUsers);
app.get('/api/user/:id', getUserById);
app.post('/api/user', postUser);
app.put('/api/user/:id', putUseraById);
app.delete('/api/user/:id', deleteUserById);

app.get('/', (req, res) => {
  res.render('home', { mediaData: mediaItems });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
