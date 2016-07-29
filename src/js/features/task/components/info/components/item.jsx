import React from 'react';
import styles from '../styles';

class TaskInfoItem extends React.Component {

  render() {
    if (!this.props.itemValue || this.props.itemValue.lengh === 0) {
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
  itemLabel: React.PropTypes.string.isRequired,
  itemValue: React.PropTypes.string.isRequired
};

TaskInfoItem.displayName = 'TaskInfoItem';

export default TaskInfoItem;
