import React from 'react';

import { Header } from '../features/header';

class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default MainLayout;
