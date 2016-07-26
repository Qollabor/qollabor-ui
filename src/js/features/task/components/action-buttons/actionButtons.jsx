import React from 'react';

import { RaisedButton, Popover } from 'material-ui';
import UserSelector from '../../../../components/user-selector';

const buttonStyle = {
  margin: '3px'
};

export class ActionButtons extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      selectedAction: null
    };
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
      open: false,
      anchorEl: null,
      selectedAction: null
    });
  }

  handleButtonClick(action, event) {
    const taskId = this.props.taskId;
    if (action === 'assign' || action === 'delegate') {
      this.handleRequestOpen(action, event);
    } else if (this.props.onButtonClick) {
      this.props.onButtonClick(taskId, action);
    }
  }

  handleUserSelectChange(user, selected) {
    const taskId = this.props.taskId;
    const selectedAction = this.state.selectedAction;
    if (selected) {
      this.props.onButtonClick(taskId, selectedAction, user);
      this.requestRequestClose();
    }
  }

  render() {
    const content = (
      <div>
        <div>
            {this.props.availableActions.map((taskAction) => (
              <RaisedButton
                style={buttonStyle}
                backgroundColor={taskAction.backgroundColor}
                labelColor="white"
                key={taskAction.action}
                label={taskAction.label}
                disabled={taskAction.disabled || this.props.disabled}
                onTouchTap={this.handleButtonClick.bind(this, taskAction.action)}
              />
            ))}
        </div>

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
          />
        </Popover>
      </div>
    );

    return content;
  }
}

ActionButtons.propTypes = {
  availableActions: React.PropTypes.array.isRequired,
  taskId: React.PropTypes.string.isRequired,
  onButtonClick: React.PropTypes.func
};

export default ActionButtons;
