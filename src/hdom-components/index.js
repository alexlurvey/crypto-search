import { start } from '@thi.ng/hdom';
import { getAllCryptos } from '../api';
import { filters } from './filters';
import { cryptocard } from './cryptoCard';

const app = () => {
    let cryptos = [];
    return {
        init: async () => {
            const res = await getAllCryptos();
            cryptos = res.data || [];
        },
        render: () => {
            return ['section.section.app-wrapper', 
                ['div.container',
                    ['h1.title', 'Search CryptoCurrencies'],
                    filters(),
                    cryptos.map(cryptocard),
                ]];
        }
    }
}

start([app()], { root: document.getElementById('root') });