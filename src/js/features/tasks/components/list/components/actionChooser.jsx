import React from 'react';

import { IconButton, IconMenu, MenuItem, Popover } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';
import UserSelector from '../../../../../components/user-selector';

export class ActionChooser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openUserSelector: false,
      selectedAction: null
    };
  }

  handleTouchTap(event) {
    if (event) {
      event.stopPropagation();
    }

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleClick(event) {
    if (event) {
      event.stopPropagation();
    }
  }

  handleRequestOpen(action) {
    this.setState({
      open: false,
      openUserSelector: true,
      selectedAction: action
    });
  }

  requestRequestClose() {
    this.setState({
      openUserSelector: false
    });
  }

  handleMenuItemTouchTap(action) {
    if (action === 'assign' || action === 'delegate') {
      this.handleRequestOpen(action, event);
    } else if (this.props.onActionHandler) {
      this.props.onActionHandler(action);
    }
  }

  handleUserSelectChange(user, selected) {
    const action = this.state.selectedAction;
    if (selected) {
      this.props.onActionHandler(action, user);
      this.requestRequestClose();
    }
  }

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton
            onClick={this.handleClick.bind(this)}
            onTouchTap={this.handleTouchTap.bind(this)}
          ><NavigationMoreVert /></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          {this.state.open ?
            this.props.actionItems.map(function(actionitem) {
              let disabled = this.props.isDisabled ?
                this.props.isDisabled(actionitem.action) : false;
              let menuItemClass = (disabled === true) ? 'menuItemDisabled' : '';
              return (
                <MenuItem
                  className={menuItemClass} key={actionitem.action} disabled={disabled}
                  primaryText={actionitem.primaryText} leftIcon={actionitem.leftIcon}
                  onTouchTap={this.handleMenuItemTouchTap.bind(this, actionitem.action)}
                />
              );
            }, this)
          : null}
        </IconMenu>
        <Popover
          open={this.state.openUserSelector}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.requestRequestClose.bind(this)}
          bodyStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
        >
          <UserSelector
            onUserSelectChange={this.handleUserSelectChange.bind(this)}
          />
        </Popover>
      </div>
    );
  }
}

ActionChooser.displayName = 'ActionChooser';

ActionChooser.propTypes = {
  isVerifyAuth: React.PropTypes.bool,
  onActionHandler: React.PropTypes.func.isRequired
};

export default ActionChooser;
