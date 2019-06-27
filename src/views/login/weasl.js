import React, { Component } from 'react';


import Header from 'components/Header';
import './style.css';

class WeaslLogin extends Component {
  onSignupClick = () => {
    global.weasl.signup()
      .then(({ data }) => this.props.onLogin(data))
      .catch(console.warn)
  }

  onLoginClick = () => {
    global.weasl.login()
      .then(({ data }) => this.props.onLogin(data))
      .catch(console.warn)
  }

  render() {
    const {
      waitingOnWeasl,
    } = this.props;

    return (
      <div>
        <Header />
        <main id="main-content" className="with-header">
          <div className="constrain-width">
            {waitingOnWeasl && <div>Loading</div>}
            {!waitingOnWeasl && <div></div>}
          </div>
        </main>
      </div>
    );
  }
}

export default WeaslLogin;
