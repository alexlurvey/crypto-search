import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { cryptocurrencyStorage } from './middlewares';
import { cryptocurrencies } from './cryptocurrencies';
import { filters } from './filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [ thunk, cryptocurrencyStorage ];
const enhancer = composeEnhancers(applyMiddleware(...middlewares));
export const store = createStore(combineReducers({ cryptocurrencies, filters }), enhancer);