# Test Commands
## Direct to Server

curl -X POST http://localhost:3001/users/register -H "Content-Type: application/json" -d '{"name":"test", "email":"test@example.com", "password":"1234"}'

curl -X POST http://localhost:3001/users/login -H "Content-Type: application/json" -d '{"email":"test@example.com", "password":"1234"}'

curl -X POST http://localhost:3002/product/create -H "Content-Type: application/json" -d '{"name":"New Product", "description":"A new product description", "price":99.99}'

curl -X POST http://localhost:3002/product/buy -H "Content-Type: application/json" -d '{"ids":["668b7c6ca8b30a0fe3823a72"]}'

## Nginx Reverse Proxy

curl -X POST http://localhost/users/login -H "Content-Type: application/json" -d '{"email":"test@example.com", "password":"1234"}'

curl -X POST http://localhost/users/register -H "Content-Type: application/json" -d '{"name":"test", "email":"test@example.com", "password":"1234"}'

curl -X POST http://localhost/product/create -H "Content-Type: application/json" -d '{"name":"Toothpaste", "description":"Brush your teeth", "price":100}'

curl -X POST http://localhost/product/buy -H "Content-Type: application/json" -d '{"ids":["668b7c6ca8b30a0fe3823a72"]}'
