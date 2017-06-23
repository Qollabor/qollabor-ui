import React from 'react';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';

import registry from 'app-registry';

import { Details } from './components/details';

import { DiscretionaryItems } from './components/discretionary-items';
import { CaseInformation, CaseAttachments, CaseEvents, CaseTeam } from '../case';

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
    const theme = registry.get('theme');
    const drawerWidth = (theme.rightDrawer && theme.rightDrawer.width) || theme.drawer.width;

    const divContainerStyle = {
      marginRight: `${drawerWidth + 5}px`
    };

    return (
      <div style={{ height: '100%' }}>
        <div style={divContainerStyle}>
          <Paper style={{ padding: '8px' }}>
            <div style={{ margin: 12 }}>
              <Details taskId={this.props.taskId} caseId={this.props.caseId} />
            </div>
          </Paper>
        </div>
        <Drawer
          open={true}
          docked={true}
          containerStyle={styles.leftNav}
          openSecondary={true}
        >
          <CaseTeam caseId={this.props.caseId} title="Case team" />

          <CaseInformation caseId={this.props.caseId} title="Case information" />

          <CaseEvents title="Available events" />

          <DiscretionaryItems taskId={this.props.taskId} emptyListMessage="No items" />

          <CaseAttachments caseId={this.props.caseId} />
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
