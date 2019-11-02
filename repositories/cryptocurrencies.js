const axios = require('axios');
const { cmc_api, api_key } = require('./constants');
const testData = require('./test-data.json');
const env = require('../environment');

const cmc_instance = axios.create({
  baseURL: cmc_api,
  headers: { 'X-CMC_PRO_API_KEY': api_key }
});

const getAll = async (limit = 200) => {
  try {
    if (!env.USE_REAL_COINMARKETCAP_DATA) {
      return testData;
    }
    let response = await cmc_instance.get(`/cryptocurrency/listings/latest?start=1&limit=${limit}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAll
}
