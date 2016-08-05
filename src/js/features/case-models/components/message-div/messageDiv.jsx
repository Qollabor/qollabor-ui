import React from 'react';

class MessageDiv extends React.Component {
  render() {
    return (
      <div style={{ position: 'relative', margin: 'auto', width: 200 }}>
        {this.props.message}
      </div>
    );
  }
}

MessageDiv.displayName = 'MessageDiv';

MessageDiv.propTypes = {
  message: React.PropTypes.string.isRequired
};

export default MessageDiv;
