import React from 'react';

import { IconButton, IconMenu, MenuItem } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';

export class ActionChooser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
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

  handleMenuItemTouchTap(action) {
    this.props.onActionHandler(this, this.props.rowIndex, action);
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton
          onClick={this.handleClick.bind(this)}
          onTouchTap={this.handleTouchTap.bind(this)}
        ><NavigationMoreVert /></IconButton>}
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
                className={menuItemClass} key={actionitem.action} disabled={disabled} primaryText={actionitem.primaryText}
                leftIcon={actionitem.leftIcon} onTouchTap={this.handleMenuItemTouchTap.bind(this, actionitem.action)}
              />
            );
          }, this)
        : null}
      </IconMenu>
    );
  }
}

ActionChooser.displayName = 'ActionChooser';

ActionChooser.propTypes = {
  isVerifyAuth: React.PropTypes.bool,
  onActionHandler: React.PropTypes.func.isRequired
};

export default ActionChooser;
