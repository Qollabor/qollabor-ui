import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Menu, MenuItem, IconButton, FontIcon } from 'material-ui';
import { PopoverAnimationVertical } from 'material-ui/Popover';

export class ColumnPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.handleIconTouchTap = this.handleIconTouchTap.bind(this);
    this.handleIconRequestClose = this.handleIconRequestClose.bind(this);
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
          // onClick={this.handleIconTouchTap}
          onTouchTap={this.handleIconTouchTap}
        >
          <FontIcon className="material-icons">settings</FontIcon>
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleIconRequestClose}
          animation={PopoverAnimationVertical}
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
  columns: PropTypes.array.isRequired,
  onMenuItemClicked: PropTypes.func.isRequired
};

export default ColumnPicker;
