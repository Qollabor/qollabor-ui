import React from 'react';
import { StatusCapsule } from '../../../../components/capsules/capsules';

class TaskStats extends React.Component {

  render () {
    return (
      <div>
        <StatusCapsule status={'Unassigned'}>{this.props.taskStats}</StatusCapsule>
      </div>
    );
  }
}

export default TaskStats;
