import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import cx from 'classnames';

import { AuthAPI } from 'api/auth';
import { CurrentUser } from 'utils/contexts';
import { EmailLogin, EmailSignup } from 'views/login';
import Sidebar from 'components/Sidebar';
import { AGORA_ON_AGORA_CLIENT_ID, SHIM_URL } from 'constants/resources';
import { setMe } from 'modules/auth/actions';
import { fetchOrg } from 'modules/org/actions';

import ChatView from './views/chat';
import Onboard from './views/onboard';
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
    this.mountAgora();
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

  mountAgora = () => {
    (function(window, document) {
      if (window.agora) console.error('Agora embed already included');
      window.agora = {};
      const m = ['init', 'getCurrentUser', 'debug'];
      window.agora._c = [];
      m.forEach(me => window.agora[me] = function() {window.agora._c.push([me, arguments])});
      const elt = document.createElement('script');
      elt.type = "text/javascript"; elt.async = true;
      elt.src = SHIM_URL;
      const before = document.getElementsByTagName('script')[0];
      before.parentNode.insertBefore(elt, before);
    })(window, document, undefined);
    agora.init(AGORA_ON_AGORA_CLIENT_ID);
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
            <Route exact={true} path="/" render={this.makeLoginRequiredComponent(Onboard)} />
            <Route path="/chat" render={this.makeLoginRequiredComponent(ChatView)} />
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
