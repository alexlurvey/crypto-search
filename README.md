# Crypto Search

Search amongst the top 200 cryptocurrencies.
#### Demo: https://crypto-search.now.sh/

## Running the application
```
yarn install
yarn build
yarn start
```
Navigate to http://localhost:3000

To run in development mode with file watching use `yarn dev:local`. This command will load fake data from a json file.
`yarn dev` is meant to be ran with now (`now dev`).

If you have a CoinMarketCap API key and want to use current data, copy it into this [constants](./repositories/constants.js) file.

## Directory Structure

- /repositories - data sources for the application. There is only one, [cryptocurrencies](./repositories/cryptocurrencies.js), which wraps [CoinMarketCap's](https://coinmarketcap.com/api/documentation/v1/) api.
- /src - Contents for the SPA.
- /public - build output.
- /api - serverless functions that mirror the local server file, so the app can be deployed to the now.sh platform.

## Technologies
- Build tools: [Rollup](https://rollupjs.org/guide/en/), [babel](https://babeljs.io/), [PostCSS](https://postcss.org/)
- Server: [Express](https://expressjs.com/)
- Frontend (3 different builds):
  - React/Redux
  - atom & interceptors
    - [@thi.ng/hodm](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
    - [@thi.ng/interceptors](https://github.com/thi-ng/umbrella/tree/master/packages/interceptors)
    - [@thi.ng/atom](https://github.com/thi-ng/umbrella/tree/master/packages/atom)
  - rstream
    - [@thi.ng/hdom](https://github.com/thi-ng/umbrella/tree/master/packages/hdom)
    - [@thi.ng/rstream](https://github.com/thi-ng/umbrella/tree/master/packages/rstream)
- CSS: [Bulma](https://bulma.io/)
