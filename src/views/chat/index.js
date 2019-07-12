import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from 'modules/messages/actions';
import { path } from 'ramda';


class ChatView extends Component {
  constructor(props) {
    super(props);
  }

  loadMoreMessages = () => {
    const {
      messagesById,
      fetchMessages,
    } = this.props;

    const messages = Object.values(messagesById);

    const oldestDate = messages.reduce((oldestDateSoFar, message) => {
      const messageDate = new Date(Date.parse(`${message.created_at}Z`));
      return messageDate < oldestDateSoFar ? messageDate : oldestDateSoFar;
    }, new Date());

    fetchMessages(messages[0].conversation_id, oldestDate.toISOString());
  }

  render() {
    const {
      messagesById,
    } = this.props;

    return (
      <div>
        <div onClick={this.loadMoreMessages}>Click to load more</div>
        {Object.values(messagesById).map(message => <div key={message.id}>{message.body}</div>)}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  messagesById: path(['messages', 'byId'], state),
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: (conversationId, before) => dispatch(fetchMessages({ conversationId, before }))
})


export default connect(mapStateToProps, mapDispatchToProps)(ChatView);