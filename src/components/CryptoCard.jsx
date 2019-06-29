import React from 'react';
import { formatPrice } from '../utils';

export const CryptoCard = React.memo(({ crypto }) => {
  const { price, market_cap, percent_change_24h } = crypto.quote.USD;
  const isPositivePercentChagne = percent_change_24h > 0;
  const hasPercentChange = percent_change_24h !== 0;
  const percentChangeClass = hasPercentChange
    ? isPositivePercentChagne
      ? 'positive-percent-change' : 'negative-percent-change'
    : null;

  return (
    <div className="card crypto-card-wrapper">
      <header className="card-header">
        <p className="card-header-title">{crypto.name}</p>
        <a className="crypto-icon-link" href={`https://coinmarketcap.com/currencies/${crypto.slug}`} target="_blank">
          <span className="icon">
            <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}></img>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content crypto-card-content">
          <div>
            <div><strong>Price</strong></div>
            <div>{formatPrice(price)}</div>
          </div>
          <div>
            <div><strong>Market Cap</strong></div>
            <div>{formatPrice(market_cap, 0)}</div>
          </div>
          <div className="percent-change">
            <div><strong>Percent Change (24h)</strong></div>
            <div className={percentChangeClass}>
              {percent_change_24h.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});