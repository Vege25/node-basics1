const items = [
  { id: 5, name: 'moi' },
  { id: 6, name: 'hei' },
  { id: 19, name: 'Hei hei' },
];

const getItems = (res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  const jsonItems = JSON.stringify(items);
  res.end(`{"message" : "All items", "items": ${jsonItems}`);
};
const getItemsById = (res, id) => {
  const item = items.find((element) => element.id == id);
  if (item) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(item));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(`{ "message": 'item not found' }`);
  }
};

const postItem = (req, res) => {
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
      const newID = items.length >= 1 ? items[items.length - 1].id + 1 : 0;
      items.push({ id: newID, name: body.name });
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end('{"message" : "New item added"}');
    });
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
