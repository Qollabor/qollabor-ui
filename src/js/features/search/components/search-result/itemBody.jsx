import React from 'react';

class ItemBody extends React.Component {
  render () {
    return <div>{this.props.children}</div>;
  }
}

export default ItemBody;
