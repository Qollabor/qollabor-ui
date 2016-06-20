import React from 'react';

import { RaisedButton } from 'material-ui';

const buttonStyle = {
  margin: '3px'
};

export class ActionButtons extends React.Component {
  handleButtonClick(taskId, action) {
    if (this.props.onButtonClick) {
      this.props.onButtonClick(taskId, action);
    }
  }

  render() {
    const content = (
      <section>
          {this.props.availableActions.map((taskAction) => (
            <RaisedButton
              style={buttonStyle}
              backgroundColor={taskAction.backgroundColor}
              labelColor="white"
              key={taskAction.action}
              label={taskAction.label}
              disabled={taskAction.disabled || this.props.disabled}
              onTouchTap={this.handleButtonClick.bind(this, this.props.taskId, taskAction.action)}
            />
          ))}
      </section>
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
