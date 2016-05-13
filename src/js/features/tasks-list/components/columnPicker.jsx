import React from 'react';

import { Popover, Menu, MenuItem, IconButton, FontIcon } from 'material-ui';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';

export class ColumnPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleIconTouchTap(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleIconRequestClose() {
    this.setState({
      open: false
    });
  }

  handleMenuItemTouchTap(item, event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (this.props.onMenuItemClicked) {
      this.props.onMenuItemClicked(item);
    }
  }

  render() {
    return (
      <div>
        <IconButton
          // onClick={this.handleIconTouchTap.bind(this)}
          onTouchTap={this.handleIconTouchTap.bind(this)}
        >
          <FontIcon className="material-icons">settings</FontIcon>
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleIconRequestClose.bind(this)}
          animation={PopoverAnimationFromTop}
        >
          <Menu>
            {this.props.columns
              .map((column) => {
                let icon;

                if (column.visible) {
                  icon = <FontIcon className="material-icons">check_box</FontIcon>;
                } else {
                  icon = <FontIcon className="material-icons">check_box_outline_blank</FontIcon>;
                }

                return (
                  <MenuItem
                    key={column.key}
                    primaryText={column.label}
                    leftIcon={icon}
                    // onClick={this.handleMenuItemTouchTap.bind(this, column)}
                    onTouchTap={this.handleMenuItemTouchTap.bind(this, column)}
                  />
                );
              })}
          </Menu>
        </Popover>
      </div>
    );
  }
}

ColumnPicker.displayName = 'ColumnPicker';
ColumnPicker.propTypes = {
  columns: React.PropTypes.array.isRequired,
  onMenuItemClicked: React.PropTypes.func.isRequired
};

export default ColumnPicker;
