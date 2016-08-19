import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Popover, Menu, MenuItem, IconButton, Divider } from 'material-ui';
import { ActionAccountCircle, ActionPowerSettingsNew, ActionLockOpen, ActionFace } from 'material-ui/svg-icons';
import { PopoverAnimationVertical } from 'material-ui/Popover';
import { PasswordChanger } from '../password-changer';
import { UserProfileDialog } from '../../../user';
import Avatar from '../../../../components/user-avatar';

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

  componentWillMount() {
    if (this.props.init) {
      this.props.init();
    }
  }

  handleTouchTap(userId, event) {
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
    const { profile } = this.props;
    const avatarSize = this.props.avatarSize || 35;

    return (
      <div>
        {profile ? <div style={{ padding: '5px' }}><Avatar
          key={profile.name}
          user={profile}
          size={avatarSize}
          onClick={this.handleTouchTap.bind(this)}
        /></div> : <IconButton
          onClick={this.handleTouchTap.bind(this, null)}
        >
          <ActionAccountCircle
            color={theme.appBar.textColor}
          />
        </IconButton>}
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose.bind(this)}
          animation={PopoverAnimationVertical}
        >
          <div style={{ margin: '10px 10px 10px 28px', height: 170, width: 150, alignContent: 'center' }}>
            {profile &&
              <div>
                <Avatar
                  key={profile.name}
                  user={profile}
                  size={170}
                />
              </div>
            }
          </div>
          <Divider />
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
