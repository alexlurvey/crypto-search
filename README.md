# Crypto Search

Search amongst the top 200 cryptocurrencies.

## Running the application
```
yarn install
yarn build
yarn start
```

To run in development mode with file watching use `yarn dev`

## Directory Structure

- /repositories - data sources for the application. There is only one, [cryptocurrencies](./repositories/cryptocurrencies.js), which wraps [CoinMarketCap's](https://coinmarketcap.com/api/documentation/v1/) api.
- /src - Contents for the SPA.
- /public - build output and and site assets.

## Technologies
- Build tools: [Rollup](https://rollupjs.org/guide/en/), [babel](https://babeljs.io/), [PostCSS](https://postcss.org/)
- Server: [Express](https://expressjs.com/)
- Frontend: React & Redux
- CSS: [Bulma](https://bulma.io/)