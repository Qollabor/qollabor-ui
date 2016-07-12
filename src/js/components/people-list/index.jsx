import React from 'react';
import PeoplePopupList from './components/popupList';
import AvatarList from './components/avatarList';

class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreEvent: null,
      showMoreOpen: false
    };
  }

  handleOnClickAvatarAction(actionUrl) {
    if (this.props.onClick) {
      this.props.onClick(actionUrl);
    }
  }

  handleShowMoreAction(event) {
    try {
      event.preventDefault();
    } catch (e) {
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
          onClick={this.handleOnClickAvatarAction.bind(this)}
          onShowMoreAction={this.handleShowMoreAction.bind(this)}
        />

        <PeoplePopupList
          people={this.props.people}
          onClick={this.handleOnClickAvatarAction.bind(this)}
          avatarSize={avatarSize}
          open={this.state.showMoreOpen}
          showMoreEvent={this.state.showMoreEvent}
          onRequestClose={this.handleShowMoreClose.bind(this)}
        />
      </div>
    );
  }
}

PeopleList.propTypes = {
  people: React.PropTypes.array.isRequired,
  maxPeopleInList: React.PropTypes.number.isRequired,
  maxLength: React.PropTypes.number,
  avatarSize: React.PropTypes.number
};

PeopleList.displayName = 'PeopleList';

export default PeopleList;
