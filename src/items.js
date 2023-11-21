const items = [
  { id: 5, name: 'Veeti' },
  { id: 6, name: 'Valtteri' },
  { id: 19, name: 'Miro' },
];

/**
 * Gets all items
 *
 * @param {object} req - http request
 * @param {object} res - http response
 */

const getItems = (req, res) => {
  const limit = req.query.limit;
  // TODO: check that the value is valid
  if (limit) {
    res.json(items.slice(0, limit));
  } else {
    res.json(items);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getItemsById = (req, res) => {
  const { id } = req.params;
  const item = items.find((element) => element.id == id);
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.json({ message: 'Item not found' });
  }
};

const postItem = (req, res) => {
  if (req.body.name) {
    console.log('new item posted', req.body);
    items.push({ id: 0, name: req.body.name });
    res.sendStatus(201);
  }
};

const deleteItem = (req, res, id) => {
  const index = items.findIndex((element) => element.id == id);
  if (index !== -1) {
    items.splice(index, 1);
    res.writeHead(204, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Item deleted' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Item not found' }));
  }
};
const updateItem = (req, res, id) => {
  const index = items.findIndex((element) => element.id == id);
  let body = [];
  req
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      body.push(chunk);
    })
    .on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('req body', body);
      body = JSON.parse(body);
      if (!body.name) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('{"message" : "Missing data."}');
        return;
      }
      items[index].name = body.name;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{"message" : "Item updated"}');
    });
};

export { items, getItems, getItemsById, postItem, deleteItem, updateItem };
