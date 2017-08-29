import React from 'react';
import { NotificationStack } from 'react-notification';
import PropTypes from 'prop-types';

function getColors(level) {
  switch (level) {
    case 'success':
      return {
        backgroundColor: '#dff0d8',
        color: '#3c763d',
        actionColor: '#3c763d'
      };
    case 'warning':
      return {
        backgroundColor: '#fcf8e3',
        color: '#8a6d3b',
        actionColor: '#8a6d3b'
      };
    case 'danger':
      return {
        backgroundColor: '#f2dede',
        color: '#a94442',
        actionColor: '#a94442'
      };
    default:
      return {
        backgroundColor: '#d9edf7',
        color: '#31708f',
        actionColor: '#31708f'
      };
  }
}

export class Notifier extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnDismiss = this.handleOnDismiss.bind(this);
  }

  removeNotification(id) {
    this.props.onDismiss(id);
  }

  handleOnDismiss(notify) {
    this.props.onDismiss(notify.key);
  }

  render() {
    const barStyle = {
      zIndex: 10000,
      backgroundColor: 'red'
    };

    return (
      <NotificationStack
        notifications={this.props.notifications.map(
           (item) => {
             const colors = getColors(item.level);

             return {
               ...item,
               onClick: this.removeNotification.bind(this, item.key),
               barStyle: Object.assign({}, barStyle,
                 {
                   backgroundColor: colors.backgroundColor,
                   color: colors.color
                 }),
               actionStyle: Object.assign({},
                 {
                   color: colors.actionColor
                 })
             };
           }, this)}
        onDismiss={this.handleOnDismiss}
      />
    );
  }
}

Notifier.propTypes = {
  item: PropTypes.object,
  notifications: PropTypes.array,
  onDismiss: PropTypes.func
};
