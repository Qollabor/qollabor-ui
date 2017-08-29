import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import registry from 'app-registry';
import { RaisedButton, Paper, FontIcon } from 'material-ui';

const styles = {
  viewCaseBtn: {
    marginTop: '15px'
  },
  headerMargin: {
    marginTop: '15px'
  },
  errorMessage: {
    marginLeft: '30px'
  },
  errorIcon: {
    marginRight: '0px',
    marginTop: '-5px',
    color: 'red',
    position: 'absolute'
  }
};

let taskData;
let successMessage;

export class SubmitTaskDetails extends React.Component {

  componentDidMount() {
    if (this.props.transitionToState) {
      const currentUser = registry.get('store').getState().user.getIn(['loggedUser', 'username']);
      taskData = atob(this.props.data);
      taskData = taskData.replace('${currentUser}', currentUser);
      taskData = taskData.replace('${currentTime}', moment.utc().format());
      taskData = JSON.parse(taskData);
      successMessage = atob(this.props.message);
      this.props.transitionToState(this.props.taskId, this.props.caseId, taskData, 'complete');
    }
  }

  viewDetailPage() {
    const caseId = this.props.caseId;
    this.context.router.push(`/cases/${caseId}`);
  }

  render() {
    const isSuccess = this.props.isSuccess;
    const error = this.props.error;

    return (
      <Paper style={{ padding: 30, paddingTop: 10, margin: '65px 15px 15px 15px' }}>
        <div style={styles.headerMargin}>
          {isSuccess && <div>
            {successMessage}.
          </div>}
          {error.isError && <div>
            <FontIcon
              className="material-icons"
              style={styles.errorIcon}
            >report_problem</FontIcon>
            <span style={styles.errorMessage}>{error.message}.</span>
          </div>}
        </div>
        <div style={styles.viewCaseBtn}>
          <RaisedButton
            label="View case"
            primary={true}
            onClick={this.viewDetailPage.bind(this)}
          />
        </div>
      </Paper>
    );
  }
}

SubmitTaskDetails.propTypes = {
  data: PropTypes.string,
  error: PropTypes.object,
  taskId: PropTypes.string.isRequired,
  caseId: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool,
  message: PropTypes.string,
  transitionToState: PropTypes.func
};

SubmitTaskDetails.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SubmitTaskDetails;
