# Dummy restful api

Endpoints
GET /items: Get a list of all items.
GET /items/{id}: Get a specific item by ID.
POST /items: Create a new item.
PUT /items/{id}: Update an existing item by ID.
DELETE /items/{id}: Delete an item by ID.

Sample requests
GET http://localhost:3000/
GET http://localhost:3000/items
GET http://localhost:3000/items/5
POST http://localhost:3000/items
content-type: application/json
{"name": "nimi2"}
DELETE http://localhost:3000/items/5
PUT http://localhost:3000/items/5
content-type: application/json
{"name": "Uus nimi"}
