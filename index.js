require('dotenv').config();
const express = require('express');
const cors = require('cors');

const UserController = require('./server/controllers/UserController');
const LoginController = require('./server/controllers/LoginController');
const OrderController = require('./server/controllers/OrderController');

const app = express();
const port = 3021;

app.use(cors());
app.use(express.json());

app.use('/api/users', UserController);
app.use('/api/login', LoginController);
app.use('/api/orders', OrderController);

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});