import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import RouteTabs from '../../components/RouteTabs';
import AccountSettings from './settings';
import AccountSnippet from './snippet';
import Admin from './admin';

class AccountHome extends Component {
  currentUserIsAdmin = (currentUser) => {
    if (!currentUser) {
      return false;
    }

    const property = currentUser.attributes.is_weasl_admin

    return property && property.value === true && property.trusted === true
  }

  render() {
    var tabs = [
      { label: "Settings", route: "/account" },
      { label: "Snippet", route: "/account/snippet" }
    ];

    const currentUser = this.props.currentUser;
    if (this.currentUserIsAdmin(currentUser)) {
      tabs.push({ label: 'Admin', route: '/account/admin' });
    }

    return (
      <div>
        <Header />
        <main id='main-content' className="with-header">
          <RouteTabs tabs={tabs} />
          <div className="constrain-width">
              <div>
                <Route exact={true} path='/account' render={() => (
                  <div>
                    <AccountSettings />
                  </div>
                )}/>
                <Route exact={true} path='/account/snippet' render={() => (
                  <div>
                    <AccountSnippet />
                  </div>
                )}/>
                <Route exact={true} path='/account/admin' render={() => (
                  <div>
                    <Admin />
                  </div>
                )}/>
              </div>
          </div>
        </main>
      </div>
    );
  }
}

AccountHome.contextTypes = {
  router: PropTypes.object,
};

export default AccountHome;
