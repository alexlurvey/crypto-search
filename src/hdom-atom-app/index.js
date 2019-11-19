import { Atom } from '@thi.ng/atom';
import { start } from '@thi.ng/hdom';
import { EventBus, trace } from '@thi.ng/interceptors';
import * as tx from '@thi.ng/transducers';
import * as ev from './events';
import { root } from '../hdom-components';
import { initialState, events, effects } from './atom';
import { alphabetize, marketCap } from '../utils/cryptocurrencies/sorts';

const cryptoCardXform = (search) =>
    tx.filter(c => c.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);

class App {
    constructor (config) {
        this.config = config;
        this.state = new Atom(initialState);
        
        const bus = new EventBus(this.state, events, effects);

        this.ctx = {
            bus,
            onSearch: event => bus.dispatchNow([ev.EV_UPDATE_SEARCH, event.target.value]),
            onToggleMarketCap: _event => bus.dispatchNow([ev.EV_TOGGLE_MARKET_CAP]),
        };

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
        const filtered = tx.transduce(cryptoCardXform(s.search), tx.push(), s.cryptocurrencies.data);
        const sorted = s.orderByMarketCap ? filtered.sort(marketCap) : filtered.sort(alphabetize);
        return root(this.ctx, s.cryptocurrencies.loading, sorted, s.search, s.orderByMarketCap);
    }
}

const app = new App();
app.ctx.bus.dispatch([ev.EV_GET_CRYPTOCURRENCIES]);
app.start();