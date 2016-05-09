import React from 'react';

import { ThemeManager } from 'material-ui/lib/styles';
import LeftNav from 'material-ui/lib/left-nav';

import { TaskList } from '../tasks-list';
import { TasksFilter } from '../tasks-filter';

import styles from './styles';

export class TaskListLayout extends React.Component {
  render() {
    const theme = ThemeManager.getMuiTheme();
    const leftNavWidth = theme.leftNav.width;
    const divContainerStyle = {
      marginLeft: this.props.showLeftNav ? `${leftNavWidth + 10}px` : '10px',
      transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    };

    return (
      <div style={{ height: '100%' }}>
        <LeftNav
          open={this.props.showLeftNav}
          style={styles.leftNav}
          docked={true}
          width={leftNavWidth}
        >
          <TasksFilter />
        </LeftNav>
        <div style={divContainerStyle}>
          <TaskList />
        </div>
      </div>
    );
  }
}

TaskListLayout.displayName = 'TaskListLayout';

export default TaskListLayout;
