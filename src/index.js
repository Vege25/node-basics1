import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getItems, getItemsById, postItem } from './items.js';
import likeRouter from './routes/likeRoute.js';
import mediaRouter from './routes/mediaRouter.js';
import userRouter from './routes/userRouter.js';

const hostname = '127.0.0.1';
const multer = require('multer');
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name
  },
});
const upload = multer({ storage: storage });

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// Routes
app.use('/api/media', mediaRouter);
app.use('/api/user', userRouter);
app.use('/api/likes', likeRouter);

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

app.get('/', (req, res) => {
  res.render('home', { mediaData: mediaItems });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
