import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { IconButton, Popover, Menu, MenuItem } from 'material-ui';
import { ActionAccountCircle, ActionPowerSettingsNew } from 'material-ui/svg-icons';
import { PopoverAnimationVertical } from 'material-ui/Popover';

import styles from './styles';

export class AppBarUserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleTouchTap(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleLogout() {
    this.props.onLogout();
  }

  render() {
    const theme = getMuiTheme();
    return (
      <div>
        <IconButton
          onClick={this.handleTouchTap.bind(this)}
          onTouchTap={this.handleTouchTap.bind(this)}
        >
          <ActionAccountCircle
            color={theme.appBar.textColor}
          />
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose.bind(this)}
          animation={PopoverAnimationVertical}
        >
          <Menu style={styles.menu}>
            <MenuItem
              primaryText="Logout"
              leftIcon={<ActionPowerSettingsNew />}
              onClick={this.handleLogout.bind(this)}
            />
          </Menu>
        </Popover>
      </div>
    );
  }
}

AppBarUserMenu.displayName = 'AppBarUserMenu';

AppBarUserMenu.propTypes = {
  isVerifyAuth: React.PropTypes.bool,
  onLogout: React.PropTypes.func.isRequired
};

export default AppBarUserMenu;
