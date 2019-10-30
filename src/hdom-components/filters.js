export const filters = (handleChange, search, orderByMarketCap, toggleOrderByMarketCap) => {
    return ['div.filters',
        ['div', ['input.input.filter-search', {
            type: 'text',
            placeholder: 'Search',
            onchange: handleChange,
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