import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';

class TaskInfoItem extends React.Component {

  render() {
    if (!this.props.itemValue || this.props.itemValue.length === 0) {
      return false;
    }

    const containerStyle = Object.assign({}, styles.item.container, this.props.style);

    return (
      <span style={containerStyle}>
        <span style={styles.item.label}>{this.props.itemLabel}</span>
        <span style={styles.item.value} title={this.props.toolTip}>
          {this.props.itemValue}
        </span>
      </span>
    );
  }
}

TaskInfoItem.propTypes = {
  itemLabel: PropTypes.string.isRequired,
  itemValue: PropTypes.string,
  style: PropTypes.object,
  toolTip: PropTypes.string
};

TaskInfoItem.displayName = 'TaskInfoItem';

export default TaskInfoItem;
