import React from 'react';
import { RaisedButton, Paper } from 'material-ui';
import MessageDiv from '../message-div';

const styles = {
  saveButton: {
    marginTop: '15px'
  },
  headerMargin: {
    marginLeft: '5px',
    marginTop: '15px'
  },
  errorMessage: {
    color: 'red'
  },
  buttonMargin: {
    marginLeft: '5px'
  },
  buttonLabel: {
    textTransform: 'none'
  }
};

class Details extends React.Component {

  componentWillMount() {
    if (this.props.initDetails) {
      this.props.initDetails();
    }
  }

  render() {
    const { data } = this.props;

    let detailBody;
    if (this.props.error && this.props.error.isError) {
      detailBody = <MessageDiv message={this.props.error.message} />;
    } else if (!data) {
      detailBody = <MessageDiv message="No Data found ..." />;
    } else {
      detailBody = (<div>
        <div style={styles.headerMargin}>
          <h3>{data.name}</h3>
          <div><b>{data.description}</b></div>
        </div>

        {this.props.showFeedbackForm ?
          <div>
            <div style={styles.headerMargin}>The case was successfully created</div>
            <div style={styles.saveButton}>
              <RaisedButton
                secondary={true} label="CREATE A NEW CASE" labelStyle={styles.buttonLabel}
                onClick={this.props.resetDetails}
              />
            </div>
          </div> :
          <div>
            {this.props.actionError && this.props.actionError.message !== ''
            && <div style={Object.assign(styles.errorMessage, styles.headerMargin)}>
            Error: {this.props.actionError.message}</div>
            }
            <div style={styles.saveButton}>
              <RaisedButton
                primary={true} label="RESET" labelStyle={styles.buttonLabel}
                style={styles.buttonMargin} onClick={this.props.resetDetails}
              />
              <RaisedButton
                secondary={true} label="START CASE" labelStyle={styles.buttonLabel}
                onClick={this.props.startCaseModel}
              />
            </div>
          </div>
        }
      </div>);
    }

    return (
      <Paper style={{ padding: 30, paddingTop: 15, margin: 20 }}>
        {detailBody}
      </Paper>
    );
  }
}

Details.propTypes = {
  data: React.PropTypes.object.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  definition: React.PropTypes.string,
  error: React.PropTypes.object
};

export default Details;
