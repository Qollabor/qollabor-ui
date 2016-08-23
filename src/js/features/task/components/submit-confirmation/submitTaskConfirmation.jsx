import React from 'react';
import moment from 'moment';
import registry from 'app-registry';

let taskData;
let successMessage;

export class SubmitTaskDetails extends React.Component {

  componentDidMount() {
    if (this.props.transitionToState) {
      const currentUser = registry.get('store').getState().user.getIn(['loggedUser', 'username']);
      taskData = atob(this.props.data);
      taskData = taskData.replace('${currentUser}', currentUser);
      taskData = taskData.replace('${currentTime}', moment.utc().format('YYYY-MM-DDTHH:mm:ssZ'));
      taskData = JSON.parse(taskData);

      successMessage = atob(this.props.message);

      this.props.transitionToState(this.props.taskId, this.props.caseId, taskData, 'complete');
    }
  }

  render() {
    const isSuccess = this.props.isSuccess;
    const error = this.props.error;

    return (
      <div>
        {isSuccess && <div>
            {successMessage}
        </div>}
        {error.isError && <div>
          {error.message}
        </div>}
      </div>
    );
  }
}

SubmitTaskDetails.propTypes = {
  taskId: React.PropTypes.string.isRequired,
  caseId: React.PropTypes.string.isRequired
};

SubmitTaskDetails.displayName = 'Task Submission Details';

export default SubmitTaskDetails;
