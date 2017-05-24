import PropTypes from 'prop-types';
import React from 'react';
import UserList from './userList';
import { Popover } from 'material-ui';

class PeoplePopupList extends React.Component {
  constructor(props) {
    super(props);

    this.requestClose = this.requestClose.bind(this);
  }

  requestClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  render() {
    const avatarSize = this.props.avatarSize || 30;

    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.showMoreEvent}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={this.requestClose}
      >
        <div>
          <UserList
            people={this.props.people}
            onClick={this.props.onClick}
            avatarSize={avatarSize}
          />
        </div>
      </Popover>
    );
  }
}

PeoplePopupList.propTypes = {
  people: PropTypes.array.isRequired,
  onRequestClose: PropTypes.func,
  avatarSize: PropTypes.number,
  onClick: PropTypes.func,
  showMoreEvent: PropTypes.object,
  open: PropTypes.bool
};

export default PeoplePopupList;
