export const filters = (ctx, search, orderByMarketCap) => {
    return ['div.filters',
        ['div', ['input.input.filter-search', {
            type: 'text',
            placeholder: 'Search',
            oninput: ctx.onSearch,
            value: search
        }]],
        ['div.filter-checkboxes',
            ['label.checkbox', ['input', {
                type: 'checkbox',
                style: { 'margin-right': '5px' },
                value: orderByMarketCap,
                checked: orderByMarketCap,
                onclick: ctx.onToggleMarketCap,
            }], 'Order by Marketcap']
    ]];
}