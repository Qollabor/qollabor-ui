import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { IconButton, Divider, MenuItem, Drawer } from 'material-ui';
import { ActionAssignmentInd } from 'material-ui/svg-icons';
import { blue500 } from 'material-ui/styles/colors';
import StartCaseIcon from 'material-ui/svg-icons/av/play-arrow';
import registry from 'app-registry';
import { AppBarUserMenu } from '../user/components/appBarUserMenu';
import styles from './styles';
import { TasksFilter } from '../tasks/components/filter';
import CafienneSearch from '../search/components/searchbox';
import { TaskBreadcrumb } from '../task/components/breadcrumb';

// TODO Need to clear activeTask from breadcrumb-separator if nav to main myTask or unclaimed
// TODO also, need to have breadcrumbs for Start Task and My Cases (w/ CaseDescription if applicable)

const headerStyle = {
  position: 'fixed',
  width: '100%',
  zIndex: '300',
  top: 0
};

export class Header extends React.Component {
  handleLeftNavToggle() {
    if (this.props.onLeftNavToggle) {
      this.props.onLeftNavToggle();
    }
  }

  handleMenuItemChange(url) {
    const { router } = this.context;
    if (!router.isActive(url)) {
      router.push(url);
    }
  }

  render() {
    const theme = registry.get('theme');
    const drawerWidth = theme.drawer.width;
    const cafienneTitleWidth = drawerWidth - 70;
    return (
      <div style={headerStyle}>
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
            style={{ fontSize: 14 }}
          />
          <MenuItem
            primaryText="My Cases" leftIcon={<ActionAssignmentInd color={blue500} />}
            onTouchTap={this.handleMenuItemChange.bind(this, 'cases')}
            style={{ fontSize: 14 }}
          />
        </Drawer>
        <Toolbar
          style={Object.assign({}, styles.appBar)}
        >
          <ToolbarGroup style={{ float: 'left' }} firstChild={true} lastChild={false} >
            <IconButton
              tooltip="Open menu"
              iconStyle={styles.menuIcon}
              onClick={this.handleLeftNavToggle.bind(this)}
            >
              <img
                src="/assets/icons/logo.png"
                style={{ height: 30, width: 30 }}
                alt="logo"
              />
            </IconButton>
          </ToolbarGroup>
          <ToolbarGroup style={{ flexGrow: '4', justifyContent: 'space-between', marginLeft: '10px' }} firstChild={false} lastChild={false}>
            <ToolbarTitle
              style={Object.assign({}, styles.title, {
                color: theme.appBar.textColor,
                fontFamily: theme.fontFamily,
                width: cafienneTitleWidth,
              })}
              text="Qollabor"
            />
            <ToolbarGroup style={{ flexGrow: '4', justifyContent: 'space-between' }} firstChild={false} lastChild={false}>

              <TaskBreadcrumb />

              <CafienneSearch />
            </ToolbarGroup>
          </ToolbarGroup>
          <ToolbarGroup style={{ float: 'right' }} firstChild={false} lastChild={true}>
            <div style={{ display: 'inline-block' }}><AppBarUserMenu /></div>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

Header.propTypes = {
  onLeftNavToggle: PropTypes.func,
  showDrawer: PropTypes.bool
};

// Since this is not a <Route> component, we add History to the context
Header.contextTypes = {
  router: PropTypes.object
};

Header.displayName = 'Header';

export default Header;
