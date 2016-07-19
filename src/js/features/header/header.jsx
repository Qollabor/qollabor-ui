import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { IconButton, Divider, MenuItem, Drawer } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import StartCaseIcon from 'material-ui/svg-icons/av/play-arrow';
import { AppBarUserMenu } from '../user/components/appBarUserMenu';
import styles from './styles';

import { TasksFilter } from '../tasks-filter';


export class Header extends React.Component {
  handleLeftNavToggle() {
    if (this.props.onLeftNavToggle) {
      this.props.onLeftNavToggle();
    }
  }

  handleMenuItemChange(url) {
    const { router } = this.context;
    if (! router.isActive(url)) {
      router.push(url);
    }
  }

  render() {
    const theme = getMuiTheme();
    const drawerWidth = theme.drawer.width;

    const themeColorStyles = {
      backgroundColor: theme.appBar.color,
      color: theme.appBar.textColor
    };

    return (
      <div>
        <Drawer
          open={this.props.showDrawer}
          containerStyle={styles.leftNav}
          docked={true}
          width={drawerWidth}
        >
          <TasksFilter
            onBeforeChangeTasksFilter={this.handleMenuItemChange.bind(this, '/')}
          />
          <Divider />
          <MenuItem
            primaryText="Start Case" leftIcon={<StartCaseIcon color="green" />}
            onTouchTap={this.handleMenuItemChange.bind(this, 'casemodels')}
          />
        </Drawer>
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
            <div style={{ display: 'inline-block' }}><AppBarUserMenu /></div>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

// Since this is not a <Route> component, we add History to the context
Header.contextTypes = {
  router: React.PropTypes.object
};

Header.displayName = 'Header';

export default Header;
