import React from 'react';

export const CryptoCard = ({ crypto }) => {
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
        <div className="content">
          <div>{crypto.quote.USD.price}</div>
        </div>
      </div>
    </div>
  );
}