import React from 'react';

import { Header } from '../features/header';
import { AuthVerify } from '../features/login';
import { Notifier } from '../features/notifier';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class MainLayout extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AuthVerify>
            <Header />
            <div style={{ marginTop: '7px' }}>
              {this.props.children}
            </div>
          </AuthVerify>
          <Notifier />
        </div>
      </MuiThemeProvider>

    );
  }
}

export default MainLayout;
