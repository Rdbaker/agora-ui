import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { AuthAPI } from 'api/auth';
import { setToken } from 'utils/auth';

import Header from 'components/Header';
import './style.css';

class VerifyEmail extends Component {

  constructor(props) {
    super(props);

    this.token = this.props.match.params.token;

    this.state = {
      emailVerifyPending: true,
      emailVerifyFailed: false,
      emailVerifySuccess: false,
      emailVerifyFailedReason: null,
    };
  }

  async componentDidMount() {
    try {
      const res = await AuthAPI.verifyEmailLogin(this.token);
      if (res.status === 200) {
        const { JWT } = await res.json();
        setToken(JWT);
        this.setState({
          emailVerifyPending: false,
          emailVerifyFailed: false,
          emailVerifySuccess: true,
        });
        this.props.checkLogin();
        setTimeout(() => this.props.history.replace('/'), 500);
      } else {
        // TODO: check if already logged in
        throw new Error('Could not verify');
      }
    } catch (e) {
      this.setState({
        emailVerifyPending: false,
        emailVerifyFailed: true,
        emailVerifySuccess: false,
        emailVerifyFailedReason: e,
      });
    }
  }

  render() {
    const {
      emailInput,
      emailVerifyFailed,
      emailVerifyPending,
      emailVerifySuccess,
    } = this.state;

    return (
      <div>
        <Header />
        <main id="main-content" className="with-header">
          <div className="constrain-width">
            {!emailVerifySuccess && emailVerifyPending && <div>Verifying email...</div>}
            {!emailVerifySuccess && emailVerifyFailed && <div>We could not verify the email</div>}
            {emailVerifySuccess && <div>We verified your email!</div>}
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(VerifyEmail);
