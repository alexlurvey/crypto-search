import { formatPrice } from '../utils';

export const cryptoCard = (crypto) => {
    const { price, market_cap, percent_change_24h } = crypto.quote.USD;
    const isPositivePercentChange = percent_change_24h > 0;
    const hasPercentChange = percent_change_24h !== 0;
    const percentChangeClass = hasPercentChange
        ? isPositivePercentChange
            ? 'positive-percent-change' : 'negative-percent-change'
            : null;
    const cryptoLinkProps = {
        href: `https://coinmarketcap.com/currencies/${crypto.slug}`,
        target: '_blank',
    };

    return ['div.card.crypto-card-wrapper',
        ['header.card-header',
            ['p.card-header-title', crypto.name],
            ['a.crypto-icon-link', cryptoLinkProps, [
                'span.icon', ['img', { src: `https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}]
            ]]],
        ['div.card-content',
            ['div.content.crypto-card-content',
                ['div',
                    ['div', ['strong', 'Price']],
                    ['div', formatPrice(price)],
                ],
                ['div',
                    ['div', ['strong', 'Market Cap']],
                    ['div', ['div', formatPrice(market_cap, 0)]],
                ],
                ['div.percent-change',
                    ['div', ['strong', 'Percent Change (24h)']],
                    [`div.${percentChangeClass}`, percent_change_24h.toFixed(2), '%'],
                ]
            ]]
    ]
}