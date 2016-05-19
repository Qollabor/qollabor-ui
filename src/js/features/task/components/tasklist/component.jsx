import React from 'react';
import styles from './styles';
import { FontIcon } from 'material-ui';

class TaskList extends React.Component {

  handleTaskListItem(taskId, caseId) {
    if (this.props.onClickTaskListItem) {
      this.props.onClickTaskListItem(caseId, taskId);
    }
  }

  render() {
    const noTaskStyle = {
      fontStyle: 'italic',
      fontSize: '13px',
      color: 'red'
    };

    return (
      <div>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th
                colSpan="2"
                style={styles.title}
              >
                {this.props.title}
              </th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.taskList.length > 0 ? this.props.taskList.map((taskListItem) => (
              <tr
                key={taskListItem.id}
                style={{ cursor: 'pointer' }}
                onClick={this.handleTaskListItem.bind(this, taskListItem.id, taskListItem.caseInstanceId)}
              >
                <td
                  style={{ width: '10%', verticalAlign: 'middle' }}
                >
                  <FontIcon
                    className="material-icons"
                    style={Object.assign({}, styles.icon, { color: taskListItem.color })}
                  >
                    {taskListItem.icon}
                  </FontIcon>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  {taskListItem.taskName}
                </td>
              </tr >
            )) :
              <tr>
                <td colSpan="2" style={noTaskStyle}>
                  <span id="noTasksFound">Currently, no {this.props.title}.</span>
                </td>
              </tr>
          }
          </tbody>
        </table>
      </div>
    );
  }
}

TaskList.propTypes = {
  title: React.PropTypes.string.isRequired,
  taskList: React.PropTypes.array.isRequired,
  onClickTaskListItem: React.PropTypes.func.isRequired
};

TaskList.displayName = 'TaskList';

export default TaskList;
