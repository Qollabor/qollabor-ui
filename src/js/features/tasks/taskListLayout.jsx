import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';

import { TaskList } from '../tasks-list';
import { TasksFilter } from '../tasks-filter';

import styles from './styles';

export class TaskListLayout extends React.Component {
  render() {
    const theme = getMuiTheme();
    const drawerWidth = theme.navDrawer.width;
    const divContainerStyle = {
      marginLeft: this.props.showDrawer ? `${drawerWidth + 10}px` : '10px',
      transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    };

    return (
      <div style={{ height: '100%' }}>
        <Drawer
          open={this.props.showDrawer}
          containerStyle={styles.leftNav}
          docked={true}
          width={drawerWidth}
        >
          <TasksFilter />
        </Drawer>
        <div style={divContainerStyle}>
          <TaskList />
        </div>
      </div>
    );
  }
}

TaskListLayout.displayName = 'TaskListLayout';

export default TaskListLayout;
