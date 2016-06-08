import React from 'react';
import { RaisedButton, Paper } from 'material-ui';

const styles = {
  saveButton: {
    marginTop: '15px'
  },
  headerMargin: {
    marginLeft: '5px',
    marginTop: '15px'
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
    const { name, description } = this.props.data;
    return (
      <Paper style={{ padding: 30, paddingTop: 15, margin: 20 }}>
        <div style={styles.headerMargin}>
          <h3>{name}</h3>
          <div><b>{description}</b></div>
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
        }
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
