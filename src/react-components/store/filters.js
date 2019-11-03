export const ACTIONS = {
  SET_SEARCH: 'SET_SEARCH',
  TOGGLE_ORDER_BY_MARKET_CAP: 'TOGGLE_ORDER_BY_MARKET_CAP',
};

const initialState = {
  search: '',
  orderByMarketCap: false,
};

export const actionCreators = {
  setSearch: (payload) => ({ type: ACTIONS.SET_SEARCH, payload }),
  toggleOrderByMarketCap: () => ({ type: ACTIONS.TOGGLE_ORDER_BY_MARKET_CAP }),
};

export const filters = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_SEARCH:
      return {
        ...state,
        search: action.payload
      }
    case ACTIONS.TOGGLE_ORDER_BY_MARKET_CAP:
      return {
        ...state,
        orderByMarketCap: !state.orderByMarketCap
      }
    default:
      return state;
  }
};