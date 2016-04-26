import React from 'react';

class ChildComponent extends React.Component {
  render() {
    return (
      <div>
        This is a child component
      </div>
    );
  }
}

ChildComponent.displayName = 'ChildComponent';

export default ChildComponent;
