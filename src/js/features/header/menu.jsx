import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { MenuItem, Menu as MaterialMenu, IconButton, Popover } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { PopoverAnimationVertical } from 'material-ui/Popover';

import styles from './styles';

export class MenuComponent extends React.Component {
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

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleItemClick(newUrl) {
    this.setState({ open: false });
    this.props.onNavigate(`${newUrl}`);
  }

  render() {
    if (!this.props.items || !this.props.items.length === 0) {
      return false;
    }

    return (
      <div>
        <IconButton
          onClick={this.handleTouchTap.bind(this)}
          onTouchTap={this.handleTouchTap.bind(this)}
        >
          <MoreVertIcon color="white"/>
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose.bind(this)}
          animation={PopoverAnimationVertical}
        >
          <MaterialMenu style={styles.menu}>
            {this.props.items.map((item) => (
              <MenuItem key={item.name} onClick={this.handleItemClick.bind(this, item.url)}>{item.name}</MenuItem>))}
          </MaterialMenu>
        </Popover>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onNavigate: (newUrl) => {
      dispatch(push(newUrl));
    }
  };
}

export const Menu = connect(null, mapDispatchToProps)(MenuComponent);