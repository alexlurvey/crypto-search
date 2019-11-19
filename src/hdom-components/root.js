import { filters } from './filters';
import { cryptoCard } from './crypto-card';
import { pageLoading } from './page-loading';

export const root = (ctx, dataLoading, cryptocurrencies, search, orderByMarketCap) => {
    return ['section.section.app-wrapper',
            ['div.container',
                ['h1.title', 'Search Cryptocurrencies'],
                filters(ctx, search, orderByMarketCap),
                dataLoading
                    ? pageLoading(dataLoading)
                    : ['div.crypto-cards', ...cryptocurrencies.map(cryptoCard)]
            ]];
}