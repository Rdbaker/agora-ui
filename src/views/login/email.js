import React, { Component } from 'react';

import { AuthAPI } from 'api/auth';

import Header from 'components/Header';
import './style.css';

class EmailLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      emailSendPending: false,
      emailSendFailed: false,
      emailSendSuccess: false,
      emailSendFailedReason: null,
    };
  }

  setEmailSendPending = () => {
    this.setState({
      emailSendPending: true,
      emailSendSuccess: false,
      emailSendFailed: false,
    });
  }

  setEmailSendSuccess = () => {
    this.setState({
      emailSendPending: false,
      emailSendSuccess: true,
      emailSendFailed: false,
    });
  }

  setEmailSendFailed = () => {
    this.setState({
      emailSendFailed: true,
      emailSendSuccess: false,
      emailSendPending: false,
    });
  }

  onUpdateEmail = (e) => {
    this.setState({
      emailInput: e.target.value,
    });
  }

  onSubmitEmail = async (e) => {
    e.preventDefault();
    this.setEmailSendPending();
    AuthAPI.sendLoginEmail(this.state.emailInput)
      .then(({ status }) => {
        if (status === 200) {
          this.setEmailSendSuccess();
        } else {
          this.setEmailSendFailed();
        }
      })
      .catch(this.setEmailSendFailed);
  }

  render() {
    const {
      emailInput,
      emailSendFailed,
      emailSendPending,
      emailSendSuccess,
    } = this.state;

    return (
      <div>
        <Header />
        <main id="main-content" className="with-header">
          <div className="constrain-width">
            {!emailSendSuccess &&
              <form onSubmit={this.onSubmitEmail}>
                <label>Email</label>
                <input type="text" value={emailInput} placeholder="email" onChange={this.onUpdateEmail} />
                <button type="submit" onClick={this.onSubmitEmail}>Go</button>
                {emailSendPending && <div>Sending email...</div>}
                {emailSendFailed && <div>We could not send the email</div>}
              </form>
            }
            {emailSendSuccess &&
              <div>We sent an email to {emailInput} with a nice login button!</div>
            }
          </div>
        </main>
      </div>
    );
  }
}

export default EmailLogin;
