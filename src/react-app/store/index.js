import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { cryptocurrencies } from './cryptocurrencies';
import { filters } from './filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [ thunk ];
const enhancer = composeEnhancers(applyMiddleware(...middlewares));
export const store = createStore(combineReducers({ cryptocurrencies, filters }), enhancer);