import React from 'react';
import styles from './styles';
import { Paper } from 'material-ui';
import moment from 'moment';
import { TitledBox } from 'cafienne-ui-elements';
import TaskInfoItem from './components/item';

export class TaskInfo extends React.Component {

  render() {
    let content;
    if (Object.keys(this.props.taskDetails).length > 0) {
      content = (
        <div style={styles.taskInfoGroup}>
          <TaskInfoItem itemLabel={'Assignee'} itemValue={this.props.taskDetails.assignee} />
          <TaskInfoItem itemLabel={'Owner'} itemValue={this.props.taskDetails.owner} />
          <TaskInfoItem
            itemLabel={'Due date'}
            itemValue={moment(this.props.taskDetails.dueDate).format('DD-MM-YYYY')}
          />
        </div>
      );
    } else {
      content = (
        <div style={styles.taskInfoGroup}>
          No items found!
        </div>
      );
    }

    return (
      <Paper>
        <div style={{ width: '100%' }}>
          {content}
        </div>
      </Paper>
    );
  }
}

TaskInfo.propTypes = {
  taskDetails: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool,
  error: React.PropTypes.object
};

TaskInfo.displayName = 'TaskInfo';

export default TitledBox(TaskInfo);
