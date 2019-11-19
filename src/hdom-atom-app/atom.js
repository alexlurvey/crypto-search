import {
    valueSetter,
    valueUpdater,
    FX_DISPATCH_NOW,
    FX_DISPATCH_ASYNC,
} from '@thi.ng/interceptors';
import { getAllCryptos } from '../api';
import * as ev from './events';
import * as fx from './effects';

export const initialState = {
    search: '',
    orderByMarketCap: false,
    cryptocurrencies: {
        loading: false,
        data: [],
    }
};

export const events = {
    [ev.EV_UPDATE_SEARCH]: valueSetter('search'),
    [ev.EV_TOGGLE_MARKET_CAP]: valueUpdater('orderByMarketCap', x => !x),
    [ev.EV_SET_LOADING]: valueSetter('cryptocurrencies.loading'),
    [ev.EV_RECEIVE_CRYPTOCURRENCIES]: [
        valueSetter('cryptocurrencies.data'),
        () => ({
            [FX_DISPATCH_NOW]: [ev.EV_SET_LOADING, false],
        })
    ],
    [ev.EV_GET_CRYPTOCURRENCIES]: (_, [__, ___]) => ({
        [FX_DISPATCH_NOW]: [ev.EV_SET_LOADING, true],
        [FX_DISPATCH_ASYNC]: [fx.FX_CRYPTOCURRENCIES, null, ev.EV_RECEIVE_CRYPTOCURRENCIES],
    })
};

export const effects = {
    [fx.FX_CRYPTOCURRENCIES]: () => getAllCryptos().then(q => q.data)
};