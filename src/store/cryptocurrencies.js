import { createSelector } from 'reselect';
import { getAllCryptos } from '../api';

const domain_model = 'CRYPTOCURRENCIES';

export const ACTIONS = {
  GET: `GET_${domain_model}`,
  SET: `SET_${domain_model}`,
  ERROR: `ERROR_${domain_model}`,
};

const initialState = {
  loading: false,
  data: []
};

export const actionCreators = {
  getCryptocurrencies: () => {
    return async dispatch => {
      dispatch({ type: ACTIONS.GET });
      const cryptos = await getAllCryptos();
      if (cryptos.error) {
        dispatch({ type: ACTIONS.ERROR });
      }
      dispatch({ type: ACTIONS.SET, payload: cryptos.data });
    }
  },
  setCryptocurrencies: (payload) => {
    return { type: ACTIONS.SET, payload };
  },
  errorCryptocurrencies: () => {
    return { type: ACTIONS.ERROR };
  }
}

export const cryptocurrencies = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET:
      return {
        ...state,
        loading: true
      };
    case ACTIONS.SET:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}

const selectCryptoData = state => state.cryptocurrencies.data;
const selectSearch = state => state.filters.search;
const selectOrderByMarketCap = state => state.filters.orderByMarketCap;

const filteredCryptocurrencies = createSelector(
  [selectCryptoData, selectSearch],
  (data, search) => {
    if (search === '') return data;
    return data.filter(q => q.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
  }
)

export const sortedCryptocurrencies = createSelector(
  [filteredCryptocurrencies, selectOrderByMarketCap],
  (data, orderByMarketCap) => {
    const alphabetize = (a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    };
    const marketCap = (a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap;
    return data.sort(orderByMarketCap ? marketCap : alphabetize);
  }
)
