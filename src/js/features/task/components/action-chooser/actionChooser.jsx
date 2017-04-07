import React from 'react';

import { IconButton, IconMenu, MenuItem, Popover } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';
import UserSelector from '../../../../components/user-selector';

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

  handleMenuItemTouchTap(actionItem) {
    const action = actionItem.action;
    if (action === 'assign' || action === 'delegate') {
      this.handleRequestOpen(actionItem, event);
    } else if (this.props.onActionHandler) {
      this.props.onActionHandler(actionItem, null, this.props.rowIndex);
    }
  }

  handleUserSelectChange(user, selected) {
    const actionItem = this.state.selectedAction;
    if (selected) {
      this.props.onActionHandler(actionItem, user, this.props.rowIndex);
      this.requestRequestClose();
    }
  }

  render() {
    return (
      <span>
        <IconMenu
          iconButtonElement={
            <IconButton
              onClick={this.handleClick.bind(this)}
              onTouchTap={this.handleTouchTap.bind(this)}
              style={this.props.iconStyle}
            >
              <NavigationMoreVert />
            </IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          {this.state.open ?
            this.props.actionItems.map(function (actionitem) {
              const disabled = this.props.isDisabled ?
              this.props.isDisabled(actionitem, this.props.rowIndex) : false;
              const menuItemClass = (disabled === true) ? 'menuItemDisabled' : '';
              return (
                <MenuItem
                  className={menuItemClass} key={actionitem.action} disabled={disabled}
                  primaryText={actionitem.primaryText} leftIcon={actionitem.leftIcon}
                  onTouchTap={this.handleMenuItemTouchTap.bind(this, actionitem)}
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
      </span>
    );
  }
}

ActionChooser.displayName = 'ActionChooser';

ActionChooser.propTypes = {
  actionItems: React.PropTypes.array,
  isDisabled: React.PropTypes.func,
  isVerifyAuth: React.PropTypes.bool,
  iconStyle: React.PropTypes.object.isRequired,
  onActionHandler: React.PropTypes.func.isRequired,
  rowIndex: React.PropTypes.number
};

export default ActionChooser;
