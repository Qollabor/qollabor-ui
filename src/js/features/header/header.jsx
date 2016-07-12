import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { IconButton } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { AppBarUserMenu } from '../user/components/appBarUserMenu';
import styles from './styles';
import { Menu } from './menu';

export class Header extends React.Component {
  handleLeftNavToggle() {
    if (this.props.onLeftNavToggle) {
      this.props.onLeftNavToggle();
    }
  }

  render() {
    const theme = getMuiTheme();

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
            onClick={this.handleLeftNavToggle.bind(this)}
          >
            <MenuIcon
              color={theme.appBar.textColor}
            />
          </IconButton>
        </ToolbarGroup>
        <ToolbarGroup style={{ flexGrow: '4' }} firstChild={false} lastChild={false} float="left">
          <ToolbarTitle
            style={Object.assign({}, styles.title, themeColorStyles)}
            text="Cafienne"
          />
        </ToolbarGroup>
        <ToolbarGroup firstChild={false} lastChild={true} float="right">
          <Menu items={this.props.headerMenu} />
          <div style={{ display: 'inline-block' }}><AppBarUserMenu /></div>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

Header.displayName = 'Header';

export default Header;
