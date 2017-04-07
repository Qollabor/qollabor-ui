import React from 'react';

class ItemBody extends React.Component {
  render () {
    return <div>{this.props.children}</div>;
  }
}

ItemBody.propTypes = {
  children: React.PropTypes.node
};

export default ItemBody;
