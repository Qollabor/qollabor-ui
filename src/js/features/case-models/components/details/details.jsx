import React from 'react';
import { RaisedButton, Paper } from 'material-ui';
import MessageDiv from '../message-div';
import CaseModelSchemaForm from '../schema-form';

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

  handleOnSubmit(caseData) {
    if (this.props.startCaseModel) {
      this.props.startCaseModel(caseData.formData);
    }
  }

  render() {
    const buttonList = [<RaisedButton label="START CASE" primary={true} type="submit"/>,
      <RaisedButton label="RESET" primary={false} secondary={true}/>];

    const { data } = this.props;
    const caseModelSchema = this.props.caseModelSchema ? this.props.caseModelSchema : {};
    const caseSchema = caseModelSchema.schema || {};
    const caseUISchema = caseModelSchema.uiSchema || {};

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
            {caseSchema && <CaseModelSchemaForm
              buttonList={buttonList}
              schema={caseSchema}
              uiSchema={caseUISchema}
              onSubmit={this.handleOnSubmit.bind(this)}
            />}
            {this.props.actionError && this.props.actionError.message !== ''
            && <div style={Object.assign(styles.errorMessage, styles.headerMargin)}>
            Error: {this.props.actionError.message}</div>
            }
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
