// index.js
import http from 'http';
import {
  items,
  getItems,
  getItemsById,
  postItem,
  deleteItem,
  updateItem,
} from './items.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const reqParts = url.split('/');
  console.log('request: ' + req.method + ' url: ' + req.url);
  // TODO check method, url and generate response accordingly
  // use e.g. if else
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Welcome to my api</h1>');
    res.write('<p>documentation comes here</p>');
    res.end();
  } else if (method === 'GET' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('GET Items with id ', reqParts[2]);
    getItemsById(res, reqParts[2]);
  } else if (method === 'GET' && reqParts[1] === 'items') {
    console.log('GET Items');
    getItems(res);
  } else if (method === 'POST' && reqParts[1] === 'items') {
    console.log('POSTING items');
    postItem(req, res);
  } else if (method === 'DELETE' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('DELETING items');
    deleteItem(res, reqParts[2]);
  } else if (method === 'PUT' && reqParts[1] === 'items' && reqParts[2]) {
    console.log('UPDATING items');
    updateItem(req, res, reqParts[2]);
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"message" : "404 Resource not found"}');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
