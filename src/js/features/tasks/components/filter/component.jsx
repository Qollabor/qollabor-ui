import React from 'react';
import PropTypes from 'prop-types';
import { FontIcon, MenuItem } from 'material-ui';
import TaskStats from '../stats';
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
          this.props.tasksFilterTypes.map(tasksFilterType =>
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
                rightIcon={
                  <span style={{ marginTop: 0 }}>
                    <TaskStats type={tasksFilterType.type} />
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
  onChangeTasksFilter: PropTypes.func,
  onBeforeChangeTasksFilter: PropTypes.func,
  tasksFilterTypes: PropTypes.array,
  isFetchingTasksList: PropTypes.bool,
  currentTasksFilter: PropTypes.string
};

TasksFilter.displayName = 'TasksFilter';

export default TasksFilter;
