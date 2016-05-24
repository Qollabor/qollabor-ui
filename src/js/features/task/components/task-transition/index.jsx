import React from 'react';

import { RaisedButton } from 'material-ui';

const buttonStyle = {
  margin: '3px'
};

export class TaskTransitions extends React.Component {
  handleButtonClick(taskId, caseId, transition) {
    if (this.props.onButtonClick) {
      this.props.onButtonClick(taskId, caseId, transition);
    }
  }

  render() {
    const disabled = ! this.props.buttonsDisabled ? false : this.props.buttonsDisabled;

    const content = (
      <section>
          {this.props.availableTransitions.map((transition) => (
            <RaisedButton
              style={buttonStyle}
              backgroundColor={transition.backgroundColor}
              labelColor="white"
              key={transition.action}
              label={transition.label}
              disabled={disabled}
              onTouchTap={this.handleButtonClick.bind(this, this.props.taskId, this.props.caseId, transition.action)}
            />
          ))}
      </section>
    );

    return content;
  }
}

TaskTransitions.propTypes = {
  buttonsDisabled: React.PropTypes.bool,
  availableTransitions: React.PropTypes.array.isRequired,
  taskId: React.PropTypes.string.isRequired,
  caseId: React.PropTypes.string.isRequired,
  onButtonClick: React.PropTypes.func
};

export default TaskTransitions;
