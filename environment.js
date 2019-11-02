require('custom-env').env();

const truthy = new Set([ 'true', 'TRUE' ]);

module.exports = {
    USE_REAL_COINMARKETCAP_DATA: truthy.has(process.env.USE_REAL_COINMARKETCAP_DATA),
}