# Crypto Search

Search amongst the top 200 cryptocurrencies.

## Running the application
```
yarn install
yarn build
yarn start
```
Navigate to http://localhost:3000

To run in development mode with file watching use `yarn dev`. This command will load fake data from a json file.

If you have a CoinMarketCap API key and want to use current data, copy it into this [constants](./repositories/constants.js) file and run with `yarn dev:real`.

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
