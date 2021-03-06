import React, { Component } from 'react';

import { OrgsAPI } from 'api/org';

import './style.css';

export const getSnippet = (clientId) => (`(function(window, document) {
  if (window.agora) console.error('Agora embed already included');
  window.agora = {}, m = ['init', 'getCurrentUser', 'debug']; window.agora._c = [];
  m.forEach(me => window.agora[me] = function() {window.agora._c.push([me, arguments])});
  var elt = document.createElement('script');
  elt.type = "text/javascript"; elt.async = true;
  elt.src = "https://js.agorachat.org/embed/shim.js";
  var before = document.getElementsByTagName('script')[0];
  before.parentNode.insertBefore(elt, before);
})(window, document, undefined);
agora.init('${clientId}');`)

class AccountSnippet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orgData: null,
      clientId: null,
    };
  }

  componentDidMount() {
    this.doFetchMyOrg();
  }

  doFetchMyOrg = async () => {
    const response = await OrgsAPI.getMyOrg();
    const { data } = await response.json();
    this.setState({
      orgData: data,
      clientId: data.client_id,
    });
  }

  copySnippet = () => {
    this.textArea.focus();
    this.textArea.select();
    document.execCommand('copy');
  }

  render() {
    const {
      clientId,
    } = this.state;

    return (
      <div>
        <p>
            To add Agora to your app, copy the snippet of code below and paste it where you would like to have community chat.
        </p>
        {!clientId &&
          <div>Loading your snippet</div>
        }
        {clientId &&
          <pre className="agora-snippet" type="multi" onClick={this.copySnippet}>
            {getSnippet(clientId)}
          </pre>
        }
        <textarea className="agora-snippet-textarea" ref={elt => this.textArea = elt} value={getSnippet(clientId)} />
      </div>
    );
  }
}

export default AccountSnippet;
