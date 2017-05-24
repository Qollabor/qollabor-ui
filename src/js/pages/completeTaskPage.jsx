import React from 'react';
import PropTypes from 'prop-types';
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
  params: PropTypes.shape({
    taskId: PropTypes.string,
    action: PropTypes.string
  }),
  location: PropTypes.shape({
    query: PropTypes.shape({
      caseId: PropTypes.string,
      data: PropTypes.string,
      message: PropTypes.string
    })
  })
};

export default SubmitTaskConfirmationPage;
