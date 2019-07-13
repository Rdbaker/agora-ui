import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flatten } from 'ramda';

import MessageGroup from 'containers/MessageGroup';
import { fetchMessages } from 'modules/messages/actions';
import { getMessageGroups, messagesFetchPending } from 'modules/messages/selectors';


class ChatView extends Component {
  constructor(props) {
    super(props);
  }

  loadMoreMessages = () => {
    const {
      messageGroups,
      fetchMessages,
    } = this.props;

    const messages = flatten(messageGroups);

    const oldestDate = messages.reduce((oldestDateSoFar, message) => {
      const messageDate = new Date(Date.parse(`${message.created_at}Z`));
      return messageDate < oldestDateSoFar ? messageDate : oldestDateSoFar;
    }, new Date());

    fetchMessages(messages[0].conversation_id, oldestDate.toISOString());
  }

  render() {
    const {
      messagesFetchPending,
      messageGroups,
    } = this.props;

    return (
      <div className="agora-single-conversation-messages--container">
        {messagesFetchPending && <div className="agora-single-conversation-show-more--loading">Loading<LoadingDots /></div>}
        <div className="agora-single-conversation-message-show-more" onClick={this.loadMoreMessages}>Show more</div>
        {messageGroups.map((messageGroup, i) => {
          const group = <MessageGroup group={messageGroup} key={i} />;
          if (i === 0) {
            const firstMessage = messageGroup[0];
            if (!firstMessage) return group;

            const sentDate = new Date(Date.parse(`${firstMessage.created_at}Z`));
            return (
              <div key={i}>
                <div>
                  <div className="agora-single-conversation-date-break--line"></div>
                  <div className="agora-single-conversation-date-break--date">{sentDate.toDateString()}</div>
                </div>
                {group}
              </div>
            );
          } else {
            const lastGroup = messageGroups[i - 1];
            const lastFirstMessage = lastGroup[0];
            const firstMessage = messageGroup[0]
            if (!firstMessage || !lastFirstMessage) return group;

            const firstMessageSentDate = new Date(Date.parse(`${firstMessage.created_at}Z`));
            const lastFirstMessageSentDate = new Date(Date.parse(`${lastFirstMessage.created_at}Z`));

            if (firstMessageSentDate.getDate() !== lastFirstMessageSentDate.getDate()) {
              return (
                <div key={i}>
                  <div className="agora-single-conversation-date-break--container">
                    <div className="agora-single-conversation-date-break--line"></div>
                    <div className="agora-single-conversation-date-break--date">{firstMessageSentDate.toDateString()}</div>
                  </div>
                  {group}
                </div>
              );
            } else {
              return group;
            }
          }
        })}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  messageGroups: getMessageGroups(state),
  messagesFetchPending: messagesFetchPending(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: (conversationId, before) => dispatch(fetchMessages({ conversationId, before }))
})


export default connect(mapStateToProps, mapDispatchToProps)(ChatView);