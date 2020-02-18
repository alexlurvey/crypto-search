const express = require('express');
const cryptoRepository = require('./repositories').cryptocurrencies;

var app = express();

app.get('/api/cryptocurrencies', async (req, res) => {
  const cryptocurrencies = await cryptoRepository.getAll();
  res.send(cryptocurrencies);
});

app.use(express.static('public'));
app.listen(3000);
