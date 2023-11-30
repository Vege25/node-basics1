import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getItems, getItemsById, postItem } from './items.js';
import {
  errorHandler,
  logger,
  notFoundHandler,
} from './middlewares/middlewares.mjs';
import authRouter from './routes/authRoute.js';
import likeRouter from './routes/likeRoute.js';
import mediaRouter from './routes/mediaRouter.js';
import userRouter from './routes/userRouter.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.disable('x-powered-by');

app.use(express.json());
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// simple custom middleware for logging/debugging all requests
app.use(logger);

// Routes
app.use('/api/media', mediaRouter);
app.use('/api/user', userRouter);
app.use('/api/likes', likeRouter);
app.use('/api/auth', authRouter);

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

// All others routes => 404
app.use(notFoundHandler);
// default error handler
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
