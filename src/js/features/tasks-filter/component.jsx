import React from 'react';
import { FontIcon, MenuItem } from 'material-ui';
import TaskStats from './components/task-stats';
import styles from './styles';

class TasksFilter extends React.Component {

  handleChangeTasksFilter(tasksFilterName) {
    if (this.props.onBeforeChangeTasksFilter) {
      this.props.onBeforeChangeTasksFilter(tasksFilterName);
    }
    if (this.props.onChangeTasksFilter) {
      this.props.onChangeTasksFilter(tasksFilterName);
    }
  }

  render() {
    const tasksFilterTypeActiveStyle = Object.assign({}, styles.tasksFilterType, styles.tasksFilterTypeActive);
    return (
      <div>
      {
        this.props.tasksFilterTypes.map((tasksFilterType) =>
          <div key={tasksFilterType.id}>
            <MenuItem
              style={
                tasksFilterType.id === this.props.currentTasksFilter ?
                tasksFilterTypeActiveStyle :
                styles.tasksFilterType
              }
              primaryText={tasksFilterType.label}
              onTouchTap={this.handleChangeTasksFilter.bind(this, tasksFilterType.id)}
              leftIcon={
                <span>
                  <FontIcon
                    className="material-icons"
                    style={Object.assign({}, styles.icon, { color: tasksFilterType.color })}
                  >
                    {tasksFilterType.icon}
                  </FontIcon>
                </span>
              }
              rightIcon={tasksFilterType.id === 'myTasks' && <span style={{ marginTop: 0 }}>
                <TaskStats type={tasksFilterType.id}/>
              </span>
              }
              disabled={this.props.isFetchingTasksList}
            />
          </div>
        )
      }
      </div>
    );
  }
}

TasksFilter.propTypes = {
  onChangeTasksFilter: React.PropTypes.func,
  onBeforeChangeTasksFilter: React.PropTypes.func,
  tasksFilterTypes: React.PropTypes.array,
  currentTasksFilter: React.PropTypes.string
};

TasksFilter.displayName = 'TasksFilter';

export default TasksFilter;
