import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { IconButton, Popover, Menu, MenuItem } from 'material-ui';
import { ActionAccountCircle, ActionPowerSettingsNew, ActionLockOpen } from 'material-ui/svg-icons';
import { PopoverAnimationVertical } from 'material-ui/Popover';
import { PasswordChanger } from '../../components/password-changer';

import styles from './styles';

export class AppBarUserMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openPasswordDialog: false
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

  handlePasswordChangeClose() {
    this.setState({
      openPasswordDialog: false
    });
  }
  /* Change Password Actions Ends */

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
          </Menu>
        </Popover>
        {this.state.openPasswordDialog && <PasswordChanger
          open={this.state.openPasswordDialog}
          onRequestClose={this.handlePasswordChangeClose.bind(this)}
        />}
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
