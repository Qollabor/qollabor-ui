import React from 'react';

import ChildComponent from './childComponent';

class Sample extends React.Component {
  render() {
    return (
      <div>
        <ChildComponent value="1" />
      </div>
    );
  }
}

Sample.displayName = 'Sample';

export default Sample;
