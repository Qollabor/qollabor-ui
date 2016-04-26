import React from 'react';

import { Toolbar, ToolbarGroup, ToolbarTitle, IconButton } from 'material-ui';
import { ThemeManager } from 'material-ui/lib/styles';

import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import AccountCircleIcon from 'material-ui/lib/svg-icons/action/account-circle';

import styles from './styles';

class Header extends React.Component {
  render() {
    const theme = ThemeManager.getMuiTheme();

    const themeColorStyles = {
      backgroundColor: theme.appBar.color,
      color: theme.appBar.textColor
    };

    return (
      <Toolbar
        style={Object.assign({}, styles.appBar, themeColorStyles)}
      >
        <ToolbarGroup firstChild={true} lastChild={false} float="left">
          <IconButton
            tooltip="Open menu"
            iconStyle={styles.menuIcon}
          >
            <MenuIcon
              color={theme.appBar.textColor}
            />
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup firstChild={false} lastChild={false} float="left">
          <ToolbarTitle
            style={Object.assign({}, styles.title, themeColorStyles)}
            text="Cafienne"
          />
        </ToolbarGroup>
        <ToolbarGroup firstChild={false} lastChild={false} float="right">
          <IconButton
            tooltip="Account info"
            iconStyle={styles.menuIcon}
          >
            <AccountCircleIcon
              color={theme.appBar.textColor}
            />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

Header.displayName = 'Header';

export default Header;
