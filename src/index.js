import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const mountSentry = () => {
  global.Sentry && global.Sentry.init && global.Sentry.init({ dsn: 'https://67698d7a1cfa4f29a27404a96e425273@sentry.io/1383604' });
};
setTimeout(mountSentry, 0);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
