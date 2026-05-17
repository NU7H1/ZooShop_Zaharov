const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const ordersPath = path.resolve(__dirname, '../../orders.json');

const readOrders = () => {
  if (!fs.existsSync(ordersPath)) fs.writeFileSync(ordersPath, '[]');
  return JSON.parse(fs.readFileSync(ordersPath, 'utf-8'));
};
const writeOrders = (data) => fs.writeFileSync(ordersPath, JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
  const orders = readOrders();
  const { userId, role } = req.query;
  if (role === 'admin') return res.json(orders);
  res.json(orders.filter(o => String(o.userId) === String(userId)));
});

router.post('/', (req, res) => {
  const orders = readOrders();
  const newOrder = {
    id: Date.now(),
    ...req.body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  writeOrders(orders);
  res.json(newOrder);
});

router.patch('/:id/status', (req, res) => {
  const orders = readOrders();
  const idx = orders.findIndex(o => String(o.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Заказ не найден' });
  orders[idx].status = req.body.status;
  writeOrders(orders);
  res.json(orders[idx]);
});

module.exports = router;