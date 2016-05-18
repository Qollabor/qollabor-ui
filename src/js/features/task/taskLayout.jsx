import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import Paper from 'material-ui/lib/paper';
import { ThemeManager } from 'material-ui/lib/styles';
import styles from './styles';
import { TaskDetails } from '../task-details';
import { CaseInformation, CaseAttachments } from '../case';

export class TaskLayout extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.caseId);
    }
  }

  render() {
    const theme = ThemeManager.getMuiTheme();
    const leftNavWidth = theme.leftNav.width;

    const divContainerStyle = {
      marginLeft: this.props.showLeftNav ? `${leftNavWidth + 10}px` : '10px',
      marginRight: `${leftNavWidth + 10}px`,
      transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    };

    return (
      <div style={{ height: '100%' }}>
        <LeftNav
          open={this.props.showLeftNav}
          docked={true}
          style={styles.leftNav}
        >left nav</LeftNav>
        <div style={divContainerStyle}>
          <Paper style={{ padding: '10px' }}>
            <div style={{ minHeight: '500px' }}>

              <TaskDetails taskId={this.props.taskId} />
            </div>
          </Paper>
        </div>
        <LeftNav
          open={true}
          docked={true}
          style={styles.leftNav}
          openRight={true}
        >
          <CaseInformation caseId={this.props.caseId} />

          <CaseAttachments caseId={this.props.caseId} />
        </LeftNav>
      </div>
    );
  }
}

TaskLayout.propTypes = {
  onMount: React.PropTypes.func,
  taskId: React.PropTypes.string.isRequired,
  caseId: React.PropTypes.string.isRequired,
  showLeftNav: React.PropTypes.bool
};

TaskLayout.displayName = 'TaskLayout';

export default TaskLayout;
