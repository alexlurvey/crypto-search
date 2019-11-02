# Crypto Search

Search amongst the top 200 cryptocurrencies.

## Running the application
Note: to get usable data paste your CoinMarketCap API key into the [constants](./repositories/constants.js) files.
```
yarn install
yarn build
yarn start
```
Navigate to http://localhost:3000

To run in development mode with file watching use `yarn dev`

## Directory Structure

- /repositories - data sources for the application. There is only one, [cryptocurrencies](./repositories/cryptocurrencies.js), which wraps [CoinMarketCap's](https://coinmarketcap.com/api/documentation/v1/) api.
- /src - Contents for the SPA.
- /public - build output.

## Technologies
- Build tools: [Rollup](https://rollupjs.org/guide/en/), [babel](https://babeljs.io/), [PostCSS](https://postcss.org/)
- Server: [Express](https://expressjs.com/)
- Frontend (2 different builds):
  - React/Redux
  - [@thi.ng/umbrella](https://github.com/thi-ng/umbrella) ecosystem
    - [@thi.ng/hodm](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
    - [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/master/packages/interceptors)
    - [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
- CSS: [Bulma](https://bulma.io/)
