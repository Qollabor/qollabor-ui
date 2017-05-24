import React from 'react';
import PropTypes from 'prop-types';
import PeoplePopupList from './components/popupList';
import AvatarList from './components/avatarList';

class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreEvent: null,
      showMoreOpen: false
    };

    this.handleOnClickAvatarAction = this.handleOnClickAvatarAction.bind(this);
    this.handleShowMoreAction = this.handleShowMoreAction.bind(this);
    this.handleShowMoreClose = this.handleShowMoreClose.bind(this);
  }

  handleOnClickAvatarAction(userId) {
    if (this.props.onClick) {
      this.props.onClick(userId);
    }
  }

  handleShowMoreAction(event) {
    try {
      event.preventDefault();
    } catch (e) {
      // eslint-disable-next-line no-param-reassign
      event.returnValue = false;
    }
    this.setState({
      showMoreOpen: true,
      showMoreEvent: event.currentTarget
    });
  }

  handleShowMoreClose() {
    this.setState({
      showMoreEvent: null,
      showMoreOpen: false
    });
  }

  render() {
    const avatarSize = this.props.avatarSize || 30;
    const maxPeopleInList = this.props.maxPeopleInList || 4;

    return (
      <div>
        <AvatarList
          people={this.props.people}
          avatarSize={avatarSize}
          maxLength={this.props.maxLength}
          maxPeopleInList={maxPeopleInList}
          onClick={this.handleOnClickAvatarAction}
          onShowMoreAction={this.handleShowMoreAction}
        />

        <PeoplePopupList
          people={this.props.people}
          onClick={this.handleOnClickAvatarAction}
          avatarSize={avatarSize}
          open={this.state.showMoreOpen}
          showMoreEvent={this.state.showMoreEvent}
          onRequestClose={this.handleShowMoreClose}
        />
      </div>
    );
  }
}

PeopleList.propTypes = {
  onClick: PropTypes.func,
  people: PropTypes.array.isRequired,
  maxPeopleInList: PropTypes.number.isRequired,
  maxLength: PropTypes.number,
  avatarSize: PropTypes.number
};

PeopleList.displayName = 'PeopleList';

export default PeopleList;
