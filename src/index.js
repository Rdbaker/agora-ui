import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import authReducer from 'modules/auth/reducer';
import orgReducer from 'modules/org/reducer';
import userReducer from 'modules/user/reducer';
import messageReducer from 'modules/messages/reducer';
import orgEpic from 'modules/org/epic';
import userEpic from 'modules/user/epic';
import socketEpic from 'modules/socket/epic';
import messageEpic from 'modules/messages/epic';
import { DEBUG } from 'constants/resources';

import './index.css';
import App from './App';


const epicMiddleware = createEpicMiddleware();
const mountSentry = () => {
  global.Sentry && global.Sentry.init && global.Sentry.init({ dsn: 'https://67698d7a1cfa4f29a27404a96e425273@sentry.io/1383604' });
};
setTimeout(mountSentry, 0);

const loggingMiddleware = () => next => action => {
  if (DEBUG) {
    console.info('[Agora] applying action', action);
  }
  next(action);
}

const store = createStore(
  combineReducers({
    auth: authReducer,
    org: orgReducer,
    user: userReducer,
    messages: messageReducer,
  }),
  compose(
    applyMiddleware(loggingMiddleware),
    applyMiddleware(epicMiddleware),
    // DEBUG && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function' && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

epicMiddleware.run(
  combineEpics(
    orgEpic,
    socketEpic,
    userEpic,
    messageEpic,
  )
)


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
