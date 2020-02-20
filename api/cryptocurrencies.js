const cryptoRepository = require('../repositories').cryptocurrencies;

module.exports = async (_req, res) => {
  const data = await cryptoRepository.getAll();
  res.status(200).send(data);
}