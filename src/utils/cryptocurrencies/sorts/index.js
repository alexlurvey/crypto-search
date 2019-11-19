export const marketCap = (a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap;
export const alphabetize = (a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
};