import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import MenuItem from 'material-ui/lib/menus/menu-item';

import styles from './styles';

class TasksFilter extends React.Component {

  handleChangeTasksFilter(tasksFilterName) {
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
              onClick={this.handleChangeTasksFilter.bind(this, tasksFilterType.id)}
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
  tasksFilterTypes: React.PropTypes.array,
  currentTasksFilter: React.PropTypes.string
};

TasksFilter.displayName = 'TasksFilter';

export default TasksFilter;
