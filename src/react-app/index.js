import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

export const unmountApp = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('react-app'))
}

export const startApp = () => {
    ReactDOM.render(<App />, document.getElementById('react-app'));
}