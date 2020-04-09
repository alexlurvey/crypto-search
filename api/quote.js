const cryptoRepository = require('../repositories').cryptocurrencies;

module.exports = async (req, res) => {
  const symbol = req.query['symbol'];

  if (!symbol)
    return res.status(400).send('Must specify a cryptocurrency symbol');

  const data = await cryptoRepository.getBySymbol(symbol);
  return res.status(200).send(data);
}