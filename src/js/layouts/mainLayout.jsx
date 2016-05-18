import React from 'react';

import { Header } from '../features/header';
import { AuthVerify } from '../features/login';
import { Notifier } from '../features/notifier';

class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <AuthVerify>
          <Header />
          <div style={{ marginTop: '7px' }}>
            {this.props.children}
          </div>
        </AuthVerify>
        <Notifier />
      </div>
    );
  }
}

export default MainLayout;
