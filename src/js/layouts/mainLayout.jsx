import React from 'react';

import { Header } from '../features/header';
import { AuthVerify } from '../features/login';

class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <AuthVerify>
          <Header />
          {this.props.children}
        </AuthVerify>
      </div>
    );
  }
}

export default MainLayout;
