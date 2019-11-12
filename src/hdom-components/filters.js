import * as ev from '../hdom-atom-app/events';

export const filters = (ctx, search, orderByMarketCap) => {
    const handleChange = (event) => {
        ctx.bus.dispatchNow([ev.EV_UPDATE_SEARCH, event.target.value]);
    }
    const toggleOrderByMarketCap = (_) => {
        ctx.bus.dispatchNow([ev.EV_TOGGLE_MARKET_CAP]);
    }
    return ['div.filters',
        ['div', ['input.input.filter-search', {
            type: 'text',
            placeholder: 'Search',
            oninput: handleChange,
            value: search
        }]],
        ['div.filter-checkboxes',
            ['label.checkbox', ['input', {
                type: 'checkbox',
                style: { 'margin-right': '5px' },
                value: orderByMarketCap,
                onclick: toggleOrderByMarketCap,
            }], 'Order by Marketcap']
    ]];
}