import React from 'react';
import styles from '../styles';

class TaskInfoItem extends React.Component {

  render() {
    if (!this.props.itemValue || this.props.itemValue.lengh === 0) {
      return false;
    }

    return (
      <div style={styles.item.container}>
        <span style={styles.item.label}>{this.props.itemLabel}</span>:
        <span style={styles.item.value}>
          {this.props.itemValue}
        </span>
      </div>
    );
  }
}

TaskInfoItem.propTypes = {
  itemLabel: React.PropTypes.string.isRequired,
  itemValue: React.PropTypes.string.isRequired
};

TaskInfoItem.displayName = 'TaskInfoItem';

export default TaskInfoItem;
