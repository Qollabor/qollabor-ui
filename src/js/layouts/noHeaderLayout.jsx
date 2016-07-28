import React from 'react';
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

export default NoHeaderLayout;
