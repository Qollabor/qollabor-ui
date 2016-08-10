import React from 'react';
import { StatusCapsule } from '../../../../components/capsules/capsules';

class TaskStats extends React.Component {

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  render () {
    return (
      <div>
        <StatusCapsule status={'Unassigned'}>{this.props.taskStats}</StatusCapsule>
      </div>
    );
  }
}

export default TaskStats;
