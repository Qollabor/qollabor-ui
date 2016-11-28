import React from 'react';

import { IconButton, IconMenu, MenuItem } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';

export class ActionSelector extends React.Component {
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

  handleMenuItemTouchTap(action) {
    this.props.onActionHandler(this, this.props.rowIndex, action);
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton onTouchTap={this.handleTouchTap.bind(this)}><NavigationMoreVert /></IconButton>}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        {this.state.open ?
          this.props.actionItems.map(function(actionitem) {
            let disabled = this.props.isDisabled ?
              this.props.isDisabled(this, this.props.rowIndex, actionitem.action) : false;
            let menuItemClass = (disabled === true) ? 'menuItemDisabled' : '';
            return (
              <MenuItem
                className={menuItemClass} disabled={disabled} primaryText={actionitem.primaryText}
                leftIcon={actionitem.leftIcon} onTouchTap={this.handleMenuItemTouchTap.bind(this, actionitem.action)}
              />
            );
          }, this)
        : null}
      </IconMenu>
    );
  }
}

ActionSelector.displayName = 'ActionSelector';

ActionSelector.propTypes = {
  isVerifyAuth: React.PropTypes.bool,
  onActionHandler: React.PropTypes.func.isRequired
};

export default ActionSelector;
