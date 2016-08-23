import React from 'react';
import { SubmitTaskConfirmation } from '../features/task/components/submit-confirmation';

class SubmitTaskConfirmationPage extends React.Component {
  render() {
    return (
      <div >
        <SubmitTaskConfirmation
          alignCenter={true}
          taskId={this.props.params.taskId}
          action={this.props.params.action}
          caseId={this.props.location.query.caseId}
          data={this.props.location.query.data}
          message={this.props.location.query.message}
        />
      </div>
    );
  }
}

export default SubmitTaskConfirmationPage;
