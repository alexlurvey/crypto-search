import React, { useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import { actionCreators as cryptoActionCreators, sortedCryptocurrencies } from './store/cryptocurrencies';
import { actionCreators as filterActionCreators } from './store/filters';
import { store } from './store';
import { CryptoCard } from './CryptoCard.jsx';
import { Filters } from './Filters.jsx';

const AppBase = (props) => {
  useEffect(() => {
    props.getCryptocurrencies();
  }, []);

  return (
    <section className="section app-wrapper">
      <div className="container box">
        <h1 className="title">
          Search Cryptocurrencies
        </h1>
        <Filters
          search={props.search}
          onSearchChange={props.setSearch}
          orderByMarketCap={props.orderByMarketCap}
          toggleOrderByMarketCap={props.toggleOrderByMarketCap}
        />
        {
          props.isLoading ? (
            <div className={`spinner ${props.isLoading ? '' : 'fade-out'}`}>
              <div className="double-bounce1"></div>
              <div className="double-bounce2"></div>
            </div>
          ) : (
            <div className="crypto-cards">
              { props.cryptos.map(item => <CryptoCard key={item.id} crypto={item} /> )}
            </div>
          )
        }
      </div>
    </section>
  )
}

const mapState = state => ({
  cryptos: sortedCryptocurrencies(state),
  isLoading: state.cryptocurrencies.loading,
  search: state.filters.search,
  orderByMarketCap: state.filters.orderByMarketCap,
});
const mapDispatch = dispatch => ({
  getCryptocurrencies: () => dispatch(cryptoActionCreators.getCryptocurrencies()),
  setSearch: (payload) => dispatch(filterActionCreators.setSearch(payload)),
  toggleOrderByMarketCap: () => dispatch(filterActionCreators.toggleOrderByMarketCap()),
});

const App = connect(mapState, mapDispatch)(AppBase);
export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);