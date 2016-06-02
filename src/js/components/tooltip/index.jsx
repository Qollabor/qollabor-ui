import React from 'react';

class ToolTip extends React.Component {
  render() {
    return (
      <this.props.tagName style={this.props.style} data-tooltip={this.props.message}>
        {this.props.children}
      </this.props.tagName>
    );
  }
}

ToolTip.propTypes = {
  message: React.PropTypes.string.isRequired,
  tagName: React.PropTypes.oneOf(['div', 'span', 'p', 'button']),
  style: React.PropTypes.object
};

export default ToolTip;
