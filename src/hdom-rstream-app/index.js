import { sync, stream } from '@thi.ng/rstream';
import { comp, map } from '@thi.ng/transducers';
import { updateDOM } from '@thi.ng/transducers-hdom';
import { getAllCryptos } from '../api';
import { root } from '../hdom-components';
import { alphabetize, marketCap } from '../utils/cryptocurrencies/sorts';

const search = stream();
const order = stream();
const data = stream();
const loading = stream();
const ctx = {
    onSearch: event => search.next(event.target.value),
    onToggleMarketCap: event => order.next(event.target.checked),
}

sync({
    src: { data, order, search, loading },
    xform: comp(
        map(({ data, order, search, loading }) => {
            const filtered = data.filter(d => d.name.toLowerCase().indexOf(search.toLowerCase()) >= 0);
            const sorted = order ? filtered.sort(marketCap) : filtered.sort(alphabetize);
            return root(ctx, loading, sorted, search, order);
        }),
        updateDOM({ root: document.getElementById('root') }),
    ),
})

loading.next(true);
search.next('');
order.next(false);
getAllCryptos().then(res => {
    data.next(res.data);
    loading.next(false);
});