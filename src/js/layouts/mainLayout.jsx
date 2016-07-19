import React from 'react';

import { Header } from '../features/header';
import { AuthVerify } from '../features/login';
import { Notifier } from '../features/notifier';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    showDrawer: state.app.get('showDrawer')
  };
}

class MainLayout extends React.Component {
  render() {
    const theme = getMuiTheme();
    const drawerWidth = theme.drawer.width;
    const divContainerStyle = {
      marginLeft: this.props.showDrawer ? `${drawerWidth + 5}px` : '5px',
      transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      marginTop: '2px'
    };
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AuthVerify>
            <Header />
            <div style={divContainerStyle}>
              {this.props.children}
            </div>
          </AuthVerify>
          <Notifier />
        </div>
      </MuiThemeProvider>

    );
  }
}

export default connect(mapStateToProps, null)(MainLayout);
