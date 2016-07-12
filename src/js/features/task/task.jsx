import React from 'react';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Details } from './components/details';

import { ActiveItems } from './components/active-items';
import { CompletedItems } from './components/completed-items';
import { DiscretionaryItems } from './components/discretionary-items';

import { CaseInformation, CaseAttachments, CaseTeam } from '../case';

import styles from './styles';

export class Task extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.caseId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.taskId !== this.props.taskId && this.props.onTaskChanged) {
      this.props.onTaskChanged(nextProps.taskId);
    }
    if (nextProps.caseId !== this.props.caseId && this.props.onCaseChanged) {
      this.props.onCaseChanged(nextProps.caseId);
    }
  }

  render() {
    const theme = getMuiTheme();
    const drawerWidth = theme.drawer.width;

    const divContainerStyle = {
      marginLeft: this.props.showDrawer ? `${drawerWidth + 10}px` : '10px',
      marginRight: `${drawerWidth + 10}px`,
      transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    };

    return (
      <div style={{ height: '100%' }}>
        <Drawer
          open={this.props.showDrawer}
          docked={true}
          containerStyle={styles.leftNav}
        >
          <ActiveItems taskId={this.props.taskId}/>
          <DiscretionaryItems taskId={this.props.taskId} emptyListMessage="No items"/>
          <CompletedItems taskId={this.props.taskId}/>

        </Drawer>
        <div style={divContainerStyle}>
          <Paper style={{ padding: '10px' }}>
            <div style={{ margin: 15 }}>
              <Details taskId={this.props.taskId} caseId={this.props.caseId}/>
            </div>
          </Paper>
        </div>
        <Drawer
          open={true}
          docked={true}
          containerStyle={styles.leftNav}
          openSecondary={true}
        >
          <CaseTeam caseId={this.props.caseId} title="Case team"/>

          <CaseInformation caseId={this.props.caseId} title="Case information"/>

          <CaseAttachments caseId={this.props.caseId}/>
        </Drawer>
      </div>
    );
  }
}

Task.propTypes = {
  onMount: React.PropTypes.func,
  onTaskChanged: React.PropTypes.func,
  onCaseChanged: React.PropTypes.func,
  taskId: React.PropTypes.string.isRequired,
  caseId: React.PropTypes.string.isRequired,
  showDrawer: React.PropTypes.bool
};

Task.displayName = 'Task';

export default Task;
