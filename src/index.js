import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

import authReducer from 'modules/auth/reducer';
import { DEBUG } from 'constants/resources';

import './index.css';
import App from './App';


const mountSentry = () => {
  global.Sentry && global.Sentry.init && global.Sentry.init({ dsn: 'https://67698d7a1cfa4f29a27404a96e425273@sentry.io/1383604' });
};
setTimeout(mountSentry, 0);

const loggingMiddleware = store => next => action => {
  if (DEBUG || store.getState().shim.debug) {
    console.info('[Agora] applying action', action);
  }
  next(action);
}

const store = createStore(
  combineReducers({
    auth: authReducer,
  }),
  compose(
    applyMiddleware(loggingMiddleware),
    DEBUG && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function' && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

if (DEBUG) {
  window.store = store;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
