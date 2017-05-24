import React from 'react';
import PropTypes from 'prop-types';

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
  message: PropTypes.string.isRequired
};

export default MessageDiv;
