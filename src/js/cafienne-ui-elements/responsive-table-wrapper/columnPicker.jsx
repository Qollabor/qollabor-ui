import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Menu, MenuItem, IconButton, FontIcon } from 'material-ui';
import PopoverAnimationFromTop from 'material-ui/Popover/PopoverAnimationVertical';

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
      <div style={this.props.style}>
        <IconButton
          onTouchTap={this.handleIconTouchTap}
        >
          <FontIcon className="material-icons" color="black" hoverColor="gray">settings</FontIcon>
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleIconRequestClose}
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
                    style={{ fontSize: 14 }}
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
  onMenuItemClicked: PropTypes.func.isRequired,
  style: PropTypes.object
};

export default ColumnPicker;
