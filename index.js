const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3020;

app.use(express.json());
app.use(express.static('static'));

// Путь к JSON-файлам
const usersPath = path.resolve(__dirname, 'users.json');
const ordersPath = path.resolve(__dirname, 'orders.json');
const productsPath = path.resolve(__dirname, 'frontend/src/assets/products.json');

// Helpers
const readJSON = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const writeJSON = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// ===== AUTH =====

// Логин
app.post('/api/login', (req, res) => {
  const { login, password } = req.body;
  const users = readJSON(usersPath);
  const user = users.find(u => u.login === login && u.password === password);
  if (!user) return res.status(401).json({ error: 'Неверный логин или пароль' });
  const { password: _, ...safeUser } = user;
  res.json(safeUser);
});

// Регистрация
app.post('/api/register', (req, res) => {
  const { name, login, password } = req.body;
  const users = readJSON(usersPath);
  if (users.find(u => u.login === login)) {
    return res.status(400).json({ error: 'Пользователь с таким логином уже существует' });
  }
  const newUser = {
    id: Date.now(),
    name,
    login,
    password,
    role: 'client',
  };
  users.push(newUser);
  writeJSON(usersPath, users);
  const { password: _, ...safeUser } = newUser;
  res.json(safeUser);
});

// ===== PRODUCTS =====

// Получить все товары
app.get('/api/products', (req, res) => {
  const products = readJSON(productsPath);
  res.json(products);
});

// Скрыть/показать товар (только админ)
app.patch('/api/products/:id/visibility', (req, res) => {
  const products = readJSON(productsPath);
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Товар не найден' });
  products[idx].hidden = req.body.hidden;
  writeJSON(productsPath, products);
  res.json(products[idx]);
});

// ===== ORDERS =====

// Получить заказы (все для админа, свои для клиента)
app.get('/api/orders', (req, res) => {
  const orders = readJSON(ordersPath);
  const { userId, role } = req.query;
  if (role === 'admin') return res.json(orders);
  res.json(orders.filter(o => o.userId === parseInt(userId)));
});

// Создать заказ
app.post('/api/orders', (req, res) => {
  const orders = readJSON(ordersPath);
  const newOrder = {
    id: Date.now(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  writeJSON(ordersPath, orders);
  res.json(newOrder);
});

// Обновить статус заказа (админ)
app.patch('/api/orders/:id/status', (req, res) => {
  const orders = readJSON(ordersPath);
  const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Заказ не найден' });
  orders[idx].status = req.body.status;
  writeJSON(ordersPath, orders);
  res.json(orders[idx]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});