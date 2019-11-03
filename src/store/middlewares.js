// currently not used
import { ACTIONS as CryptocurrencyActions } from './cryptocurrencies';
import { CRYPTOCURRENCIES_STORAGE_KEY } from '../constants';

export const cryptocurrencyStorage = _store => next => action => {
  const result = next(action);

  if (action.type !== CryptocurrencyActions.SET) {
    return result;
  }

  localStorage.setItem(CRYPTOCURRENCIES_STORAGE_KEY, JSON.stringify(action.payload));

  return result;
}