import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registry from 'app-registry';

class NoHeaderLayout extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={registry.get('theme')}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

NoHeaderLayout.propTypes = {
  children: PropTypes.node
};

export default NoHeaderLayout;
