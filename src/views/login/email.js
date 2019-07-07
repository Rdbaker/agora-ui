import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AuthAPI } from 'api/auth';
import Header from 'components/Header';
import { setToken } from 'utils/auth';
import * as AuthActions from 'modules/auth/actions';

import './style.css';


class EmailLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      passwordInput: '',
      emailLoginPending: false,
      emailLoginFailed: false,
    };
  }

  setEmailLoginPending = () => {
    this.setState({
      emailLoginPending: true,
      emailLoginFailed: false,
    });
  }

  onEmailLoginSuccess = async (res) => {
    // TODO: redirect to home & store cookie
    const { token } = await res.json();
    this.props.dispatcher.setToken(token);
    setToken(token);
  }

  setEmailLoginFailed = () => {
    this.setState({
      emailLoginFailed: true,
      emailLoginPending: false,
    });
  }

  onUpdateEmail = (e) => {
    this.setState({
      emailInput: e.target.value,
    });
  }

  onUpdatePassword = (e) => {
    this.setState({
      passwordInput: e.target.value,
    });
  }

  onSubmitEmail = async (e) => {
    e.preventDefault();
    this.setEmailLoginPending();
    AuthAPI.loginViaEmail(this.state.emailInput, this.state.passwordInput)
      .then(res => {
        if (res.status === 200) {
          this.onEmailLoginSuccess(res);
        } else {
          this.setEmailLoginFailed();
        }
      })
      .catch(this.setEmailSendFailed);
  }

  render() {
    const {
      emailInput,
      passwordInput,
      emailSendFailed,
      emailSendPending,
    } = this.state;

    return (
      <div>
        <Header />
        <main id="main-content" className="with-header">
          <div className="constrain-width">
            <form onSubmit={this.onSubmitEmail}>
              <label>Email</label>
              <input type="text" value={emailInput} placeholder="email" onChange={this.onUpdateEmail} />
              <input type="password" value={passwordInput} onChange={this.onUpdatePassword} />
              <button type="submit" onClick={this.onSubmitEmail}>Go</button>
              {emailSendPending && <div>Logging you in...</div>}
              {emailSendFailed && <div>We could not send the email</div>}
            </form>
          </div>
        </main>
      </div>
    );
  }
}


const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    setToken: (token) => dispatch(AuthActions.setToken({ token })),
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(EmailLogin);
