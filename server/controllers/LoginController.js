require('dotenv').config();
const tableService = require('../services/TableService');
const express = require('express');
const router = express.Router();

router.get('/auth', async (req, res) => {
  const { login, password } = req.query;
  if (!login || !password) {
    return res.status(400).json({ message: 'Не заполнены обязательные поля' });
  }
  try {
    const formula = `AND({Login}="${login}",{Password}="${password}")`;
    const result = await tableService.get(
      process.env.LOGIN_TABLE_ID,
      `?filterByFormula=${encodeURIComponent(formula)}&fieldKey=name`
    );
    const records = result.data;

    if (!records.records || records.records.length === 0) {
      return res.status(400).json({ message: 'Пользователь не найден', userId: 0 });
    }

    const record = records.records[0];
    const userId = record.fields.UserId[0];

    res.status(200).json({ message: 'Успешная авторизация', userId });
  } catch (error) {
    console.error('Ошибка авторизации:', error.response?.data || error.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;