import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import registry from 'app-registry';
import { Header } from '../features/header';
import { AuthVerify } from '../features/login';
import { Notifier } from '../features/notifier';

function mapStateToProps(state) {
  return {
    showDrawer: state.app.get('showDrawer')
  };
}

class MainLayout extends React.Component {
  render() {
    const theme = registry.get('theme');
    const drawerWidth = theme.drawer.width;
    const divContainerStyle = {
      marginLeft: this.props.showDrawer ? `${drawerWidth + 5}px` : '5px',
      transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      marginTop: '47px'
    };
    return (
      <MuiThemeProvider muiTheme={theme}>
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

MainLayout.propTypes = {
  showDrawer: PropTypes.bool,
  children: PropTypes.node
};

export default connect(mapStateToProps, null)(MainLayout);
