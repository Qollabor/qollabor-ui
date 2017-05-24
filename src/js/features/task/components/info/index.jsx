import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FlatButton, Popover } from 'material-ui';
import styles from './styles';
import { TitledBox } from '../../../../cafienne-ui-elements';
import TaskInfoItem from './components/item';
import UserSelector from '../../../../components/user-selector';

export class TaskInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedAction: null
    };
  }

  handleClick(event) {
    if (event) {
      event.stopPropagation();
    }
  }

  handleRequestOpen(action, event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
      selectedAction: action
    });
  }

  requestRequestClose() {
    this.setState({
      open: false
    });
  }

  handleTaskActionClick(action, event) {
    const taskId = this.props.taskDetails.id;
    if (action === 'delegate') {
      this.handleRequestOpen(action, event);
    } else if (this.props.executeTaskAction) {
      this.props.executeTaskAction(taskId, action, this.props.loggedInUserId);
    }
  }

  handleUserSelectChange(user, selected) {
    const taskId = this.props.taskDetails.id;
    const action = this.state.selectedAction;
    if (selected) {
      this.props.executeTaskAction(taskId, action, user);
      this.requestRequestClose();
    }
  }

  render() {
    let completeBy = '';
    let timeRemaining = '';
    let receivedAt = '';
    let receivedBefore = '';
    const { dueDate, createdOn } = this.props.taskDetails;
    if (dueDate) {
      const dueDateInLocalTime = moment.utc(dueDate);
      completeBy = dueDateInLocalTime.format('DD-MM-YYYY HH:mm');
      timeRemaining = `Complete in ${moment(moment().diff(dueDateInLocalTime)).format('h[h]:m[m]')}`;
    }

    if (createdOn) {
      const receivedAtInLocalTime = moment.utc(createdOn);
      receivedAt = receivedAtInLocalTime.format('DD-MM-YYYY HH:mm');
      receivedBefore = `Received before ${moment(moment().diff(receivedAtInLocalTime)).format('h[h]:m[m]')}`;
    }

    const loggedInUserId = this.props.loggedInUserId;
    const assignee = (this.props.taskDetails.assignee === loggedInUserId) ?
                        'you' : this.props.taskDetails.assignee;
    const owner = (this.props.taskDetails.owner === loggedInUserId) ?
                        'you' : this.props.taskDetails.owner;

    let content;
    if (Object.keys(this.props.taskDetails).length > 0) {
      content = (
        <div style={{ height: 60 }}>
          <div style={{ float: 'right' }}>
            <TaskInfoItem
              itemLabel={'Received at'}
              itemValue={receivedAt}
              toolTip={receivedBefore}
            />
            <br />
            <TaskInfoItem
              itemLabel={'Complete by'}
              itemValue={completeBy}
              toolTip={timeRemaining}
            />
          </div>
          <div style={{ fontSize: 14, height: 10 }}>
            {(!this.props.taskDetails.owner) &&
              <div>
                <FlatButton
                  primary={true}
                  key="claim"
                  label="Claim"
                  onTouchTap={this.handleTaskActionClick.bind(this, 'claim')}
                />
                <span>the task to continue</span>
              </div>
            }
            <TaskInfoItem itemLabel={'Assigned to'} itemValue={assignee} />
            {(this.props.taskDetails.owner && this.props.taskDetails.owner === loggedInUserId) &&
              <FlatButton
                primary={true}
                key="revoke"
                label="Revoke"
                onTouchTap={this.handleTaskActionClick.bind(this, 'revoke')}
              />
            }
            <br />
            <TaskInfoItem itemLabel={'Owned by'} itemValue={owner} />
            {(this.props.taskDetails.owner && this.props.taskDetails.owner === loggedInUserId) &&
              <FlatButton
                primary={true}
                key="delegate"
                label="Delegate"
                onTouchTap={this.handleTaskActionClick.bind(this, 'delegate')}
              />
            }
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              onRequestClose={this.requestRequestClose.bind(this)}
              bodyStyle={{ paddingTop: '10px', paddingBottom: '30px' }}
            >
              <UserSelector
                onUserSelectChange={this.handleUserSelectChange.bind(this)}
                filteredUser={this.props.taskDetails.owner}
              />
            </Popover>
          </div>
        </div>
      );
    } else {
      content = (
        <div style={styles.taskInfoGroup}>
          No items found!
        </div>
      );
    }

    return (
      <div style={{ width: '100%', marginTop: 15, marginBottom: 15 }}>
        {content}
      </div>
    );
  }
}

TaskInfo.propTypes = {
  taskDetails: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  error: PropTypes.object,
  loggedInUserId: PropTypes.string,
  executeTaskAction: PropTypes.func
};

TaskInfo.displayName = 'TaskInfo';

export default TitledBox(TaskInfo);
