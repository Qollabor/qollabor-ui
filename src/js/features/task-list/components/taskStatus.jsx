import React from 'react';

import { FontIcon } from 'material-ui';

export class TaskStatus extends React.Component {
  translateStatus(status) {
    switch (status) {
      case 'DUE':
        return 'history';

      case 'COMPLETED':
        return 'done_all';

      case 'TERMINATED':
        return 'close';

      default:
        return null;
    }
  }

  calculateStyle(status) {
    const defaultStyle = {};
    const dueStyle = { color: 'orange' };
    const completedStyle = { color: 'green' };

    switch (status) {
      case 'DUE':
        return dueStyle;

      case 'COMPLETED':
        return completedStyle;

      default:
        return defaultStyle;
    }
  }

  render() {
    const renderStatus = this.translateStatus(this.props.status);

    if (!renderStatus) {
      return false;
    }

    const iconStyle = this.calculateStyle(this.props.status);

    return (
      <FontIcon className="material-icons" style={iconStyle}>{renderStatus}</FontIcon>
    );
  }
}

TaskStatus.displayName = 'TaskStatus';

TaskStatus.propTypes = {
  status: React.PropTypes.string
};

export default TaskStatus;
