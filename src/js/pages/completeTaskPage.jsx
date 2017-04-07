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

SubmitTaskConfirmationPage.propTypes = {
  params: React.PropTypes.shape({
    taskId: React.PropTypes.string,
    action: React.PropTypes.string
  }),
  location: React.PropTypes.shape({
    query: React.PropTypes.shape({
      caseId: React.PropTypes.string,
      data: React.PropTypes.string,
      message: React.PropTypes.string
    })
  })
};

export default SubmitTaskConfirmationPage;
