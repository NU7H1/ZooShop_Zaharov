const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const productsPath = path.resolve(__dirname, '../../frontend/src/assets/products.json');

const readProducts = () => JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
const writeProducts = (data) => fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
  res.json(readProducts());
});

router.patch('/:id/visibility', (req, res) => {
  const products = readProducts();
  const idx = products.findIndex(p => String(p.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Товар не найден' });

  products[idx].hidden = Boolean(req.body.hidden);
  writeProducts(products);
  res.json(products[idx]);
});

module.exports = router;
