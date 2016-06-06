import React from 'react';
import { Avatar as MaterialAvatar } from 'material-ui';
import { calcInitials } from '../helpers/calcInitials';

export class Avatar extends React.Component {
  handleOnClick(actionUrl) {
    this.props.onClick(actionUrl);
  }

  render() {
    const padding = this.props.padding || 0;
    const person = this.props.person;
    let avatarBody;

    const actions = {};
    const style = { marginRight: `${padding}px` };
    if (person.actionUrl && person.actionUrl.length > 0) {
      actions.onClick = this.handleOnClick.bind(this, person.actionUrl);
      style.cursor = 'pointer';
    }

    const avatarSrc = {};
    let initial = null;
    if (person.avatarUrl && person.avatarUrl.length) {
      avatarSrc.src = person.avatarUrl;
    } else {
      initial = calcInitials(person.fullName);
    }
    avatarBody = (
      <MaterialAvatar
        style={style}
        {...actions}
        {...avatarSrc}
        size={this.props.size}
      >{initial}</MaterialAvatar>
    );

    return (
      <div style={{ float: 'left' }} title={`${person.fullName} (${person.userName})`}>
        {avatarBody}
      </div>);
  }
}
