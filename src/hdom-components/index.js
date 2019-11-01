import { Atom } from '@thi.ng/atom';
import { start } from '@thi.ng/hdom';
import {
    EventBus,
    trace,
    valueSetter,
    valueUpdater,
    FX_DISPATCH_NOW,
    FX_DISPATCH_ASYNC
} from '@thi.ng/interceptors';
import { getAllCryptos } from '../api';
import { filters } from './filters';
import { cryptocard } from './cryptoCard';
import * as ev from './events';
import * as fx from './effects';

const initialState = {
    search: '',
    orderByMarketCap: false,
    cryptocurrencies: {
        loading: false,
        data: [],
    }
};
const events = {
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
}
const effects = {
    [fx.FX_CRYPTOCURRENCIES]: () => getAllCryptos().then(q => q.data)
}

// TODO: use @thi.ng/transducers
const marketCap = (a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap;
const alphabetize = (a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
};

const pageLoading = (loading) => [`div.spinner${loading ? '' : '.fade-out'}`,
    ['div.double-bounce1'],
    ['div.double-bounce2'],
];

class App {
    constructor (config) {
        this.config = config;
        this.state = new Atom(initialState);
        this.ctx = { bus: new EventBus(this.state, events, effects) };
        this.ctx.bus.instrumentWith([trace]);
    }

    start () {
        start(() => {
            if (this.ctx.bus.processQueue()) {
                return this.rootComponent();
            }
        }, { root: document.getElementById('root'), ctx: this.ctx })
    }

    rootComponent () {
        const s = this.state.deref();
        return ['section.section.app-wrapper', 
            ['div.container',
                ['h1.title', 'Search CryptoCurrencies'],
                filters(this.ctx, s.search, s.orderByMarketCap),
                // TODO: use @thi.ng/transducers
                s.cryptocurrencies.loading
                    ? pageLoading(s.cryptocurrencies.loading)
                    : ['div.crypto-cards', ...s.cryptocurrencies.data
                        .filter(c => c.name.toLowerCase().indexOf(s.search.toLowerCase()) >= 0)
                        .sort(s.orderByMarketCap ? marketCap : alphabetize)
                        .map(cryptocard)],
            ]];
    }
}

const app = new App();
app.ctx.bus.dispatch([ev.EV_GET_CRYPTOCURRENCIES]);
app.start();