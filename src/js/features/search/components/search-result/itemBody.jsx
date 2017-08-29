import React from 'react';
import PropTypes from 'prop-types';

class ItemBody extends React.Component {
  render () {
    return <div>{this.props.children}</div>;
  }
}

ItemBody.propTypes = {
  children: PropTypes.node
};

export default ItemBody;
