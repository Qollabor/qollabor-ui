import React from 'react';

import { RaisedButton } from 'material-ui';

const buttonStyle = {
  margin: '3px'
};

export class TaskTransitions extends React.Component {
  handleButtonClick(taskId, transition) {
    if (this.props.onButtonClick) {
      this.props.onButtonClick(taskId, transition);
    }
  }

  render() {
    const content = (
      <section>
          {this.props.availableTransitions.map((transition) => (
            <RaisedButton
              style={buttonStyle}
              backgroundColor={transition.backgroundColor}
              labelColor="white"
              key={transition.action}
              label={transition.label}
              onTouchTap={this.handleButtonClick.bind(this, this.props.taskId, transition.action)}
            />
          ))}
      </section>
    );

    return content;
  }
}

TaskTransitions.propTypes = {
  availableTransitions: React.PropTypes.array.isRequired,
  taskId: React.PropTypes.string.isRequired,
  onButtonClick: React.PropTypes.func
};

export default TaskTransitions;
