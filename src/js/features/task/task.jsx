import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import Paper from 'material-ui/lib/paper';

import { ThemeManager } from 'material-ui/lib/styles';
import { Details } from './components/details';
import { TransitionButtons } from './components/transition-buttons';

import { ActiveItems } from './components/active-items';
import { CompletedItems } from './components/completed-items';
import { DiscretionaryItems } from './components/discretionary-items';

import { CaseInformation, CaseAttachments } from '../case';

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
        >
          <ActiveItems taskId={this.props.taskId}/>
          <DiscretionaryItems taskId={this.props.taskId} emptyListMessage="No items"/>
          <CompletedItems taskId={this.props.taskId}/>

        </LeftNav>
        <div style={divContainerStyle}>
          <Paper style={{ padding: '10px' }}>
            <div style={{ minHeight: '500px' }}>
              <Details taskId={this.props.taskId}/>

              <TransitionButtons taskId={this.props.taskId} caseId={this.props.caseId}/>
            </div>
          </Paper>
        </div>
        <LeftNav
          open={true}
          docked={true}
          style={styles.leftNav}
          openRight={true}
        >
          <CaseInformation caseId={this.props.caseId} title="Case information"/>

          <CaseAttachments caseId={this.props.caseId}/>
        </LeftNav>
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
  showLeftNav: React.PropTypes.bool
};

Task.displayName = 'Task';

export default Task;
