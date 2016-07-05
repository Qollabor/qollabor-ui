import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { IconButton, Popover, Menu, MenuItem } from 'material-ui';
import { ActionAccountCircle, ActionPowerSettingsNew, ActionLockOpen, ActionFace } from 'material-ui/svg-icons';
import { PopoverAnimationVertical } from 'material-ui/Popover';
import { PasswordChanger } from '../password-changer';
import { UserProfileDialog } from '../../../user';


import styles from './styles';

export class AppBarUserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openPasswordDialog: false,
      openProfileDialog: false
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

  /* Change Password Actions */
  handleChangePassword() {
    this.setState({
      open: false,
      openPasswordDialog: true
    });
  }

  handleChangePasswordClose() {
    this.setState({
      openPasswordDialog: false
    });
  }
  /* Change Password Actions Ends */

  handleChangeProfile() {
    this.setState({
      open: false,
      openProfileDialog: true
    });
  }

  handleChangeProfileClose() {
    this.setState({
      openProfileDialog: false
    });
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

            <MenuItem
              primaryText="Change Password"
              leftIcon={<ActionLockOpen />}
              onClick={this.handleChangePassword.bind(this)}
            />
            <MenuItem
              primaryText="Change Profile"
              leftIcon={<ActionFace />}
              onClick={this.handleChangeProfile.bind(this)}
            />
          </Menu>
        </Popover>
        <span>
          {this.state.openPasswordDialog && <PasswordChanger
            open={this.state.openPasswordDialog}
            onRequestClose={this.handleChangePasswordClose.bind(this)}
          />
          }
        </span>
        <span>
          {this.state.openProfileDialog && <UserProfileDialog
            open={this.state.openProfileDialog}
            onRequestClose={this.handleChangeProfileClose.bind(this)}
          />
          }
        </span>
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
