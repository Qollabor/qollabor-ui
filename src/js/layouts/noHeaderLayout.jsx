import React from 'react';

class NoHeaderLayout extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default NoHeaderLayout;
