import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import cx from 'classnames';

import { AuthAPI } from 'api/auth';
import { CurrentUser } from 'utils/contexts';
import { EmailLogin, EmailSignup } from 'views/login';
import Sidebar from 'components/Sidebar';
import { DEBUG } from 'constants/resources';
import { setMe } from 'modules/auth/actions';
import { fetchOrg } from 'modules/org/actions';

import Home from './views/home';
import Account from './views/account';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      fetchMePending: true,
    };
  }

  componentDidMount() {
    if (!DEBUG) {
      this.mountDrift();
    }
    this.fetchMe();
  }

  fetchMe = async () => {
    AuthAPI.getMe()
      .then(this.getMeSuccess)
      .catch(this.getMeFailed);
  }

  getMeSuccess = async (res) => {
    const { status } = res;

    if (status !== 200) {
      throw new Error()
    }

    const { data } = await res.json();

    this.setState({
      currentUser: data,
      fetchMePending: false,
    });
    this.props.dispatcher.setMe({ user: data });
    this.props.dispatcher.fetchOrg();
  }

  getMeFailed = async () => {
    this.setState({
      fetchMePending: false,
    });
  }

  mountDrift = () => {
    !function() {
      var t = window.driftt = window.drift = window.driftt || [];
      if (!t.init) {
        if (t.invoked) return void (window.console && console.error && console.error("Drift snippet included twice."));
        t.invoked = !0, t.methods = [ "identify", "config", "track", "reset", "debug", "show", "ping", "page", "hide", "off", "on" ],
        t.factory = function(e) {
          return function() {
            var n = Array.prototype.slice.call(arguments);
            return n.unshift(e), t.push(n), t;
          };
        }, t.methods.forEach(function(e) {
          t[e] = t.factory(e);
        }), t.load = function(t) {
          var e = 3e5, n = Math.ceil(new Date() / e) * e, o = document.createElement("script");
          o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous", o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js";
          var i = document.getElementsByTagName("script")[0];
          i.parentNode.insertBefore(o, i);
        };
      }
    }();
    drift.SNIPPET_VERSION = '0.3.1';
    drift.load('5dpn3ruah7x2');
  }

  makeLoginRequiredComponent(AuthedComponent) {
    const {
      currentUser,
      fetchMePending,
    } = this.state;

    return () => {
      if (fetchMePending) {
        return <div>Loading...</div>;
      }

      if (!!currentUser) {
        global.drift && global.drift.on('ready', () => {
          drift.identify(currentUser.id, { ...currentUser });
        });

        global.Sentry && global.Sentry.configureScope && global.Sentry.configureScope((scope) => {
          scope.setUser(currentUser);
        });

        return <AuthedComponent />;
      } else {
        return <EmailLogin />;
      }
    }
  }

  render() {

    const {
      currentUser,
    } = this.state;

    return (
      <BrowserRouter>
        <Sidebar />
        <div className={cx("agora-app-content--container", { 'no-sidebar': !currentUser })}>
          <CurrentUser.Provider value={currentUser}>
            <Route exact={true} path="/" render={this.makeLoginRequiredComponent(Home)} />
            <Route path="/home" render={this.makeLoginRequiredComponent(Home)} />
            <Route path="/login" component={EmailLogin}/>
            <Route path="/signup" component={EmailSignup}/>
            <Route path="/settings" render={this.makeLoginRequiredComponent(Account)} />
          </CurrentUser.Provider>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    setMe: (payload) => dispatch(setMe(payload)),
    fetchOrg: () => dispatch(fetchOrg()),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
