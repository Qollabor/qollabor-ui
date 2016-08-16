import React from 'react';
import { StatusCapsule } from '../../../../components/capsules/capsules';
import styles from '../../styles';

class TaskStats extends React.Component {

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  render () {
    const bounceStyle = this.props.bounce ? styles.bounce : null;
    return (
      <div style={bounceStyle}>
        <StatusCapsule status={'Unassigned'}>{this.props.taskStats}</StatusCapsule>
      </div>
    );
  }
}

export default TaskStats;
