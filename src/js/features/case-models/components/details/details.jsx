import React from 'react';
import { RaisedButton, FlatButton, Paper } from 'material-ui';
import { shouldRender } from 'react-jsonschema-form/lib/utils';
import MessageDiv from '../message-div';
import CaseModelSchemaForm from '../schema-form';
import CaseTeamSelector from '../caseteam-selector';

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
  constructor(props) {
    super(props);
    this.openDetailPage = this.openDetailPage.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.initDetails) {
      this.props.initDetails();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  handleOnSubmit(caseData) {
    if (this.props.startCaseModel) {
      this.props.startCaseModel(caseData.formData);
    }
  }

  openDetailPage() {
    const caseId = this.props.caseId;
    const caseLastModified = this.props.caseLastModified;
    this.context.router.push(`/cases/${caseId}?caseLastModified=${caseLastModified}`);
  }

  render() {
    const buttonList = [<RaisedButton key="start" label="START CASE" primary={true} type="submit" />,
      <FlatButton key="reset" label="RESET" primary={false} secondary={true} />];

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
          <div><b>{data.description}</b></div>
        </div>
        {this.props.showFeedbackForm ?
          <div>
            <div style={styles.headerMargin}>The case was successfully created.
              <RaisedButton
                label="Open case"
                primary={true}
                onClick={this.openDetailPage}
              /></div>
            <div style={styles.saveButton}>
              <RaisedButton
                primary={true} label="CREATE ANOTHER" labelStyle={styles.buttonLabel}
                onClick={this.props.resetDetails}
              />
            </div>
          </div> :
          <Paper style={{ padding: '5px', marginTop: '15px' }}>
            <div style={{ width: '75%', display: 'inline-block', height: '100%', verticalAlign: 'top' }}>
              {caseSchema &&
                <CaseModelSchemaForm
                  buttonList={buttonList}
                  schema={caseSchema}
                  formData={this.props.caseData}
                  uiSchema={caseUISchema}
                  onSubmit={this.handleOnSubmit}
                />
              }
              {this.props.actionError && this.props.actionError.message !== ''
                && <div style={Object.assign(styles.errorMessage, styles.headerMargin)}>
                  Error: {this.props.actionError.message}</div>
              }
            </div>
            {data.roles &&
              <div
                style={{
                  width: '22%',
                  display: 'inline-block',
                  margin: 5,
                  height: '100%',
                  paddingLeft: 10,
                  verticalAlign: 'top',
                  borderLeft: '1px solid lightgray'
                }}
              >
                <subHeader>Case Team</subHeader>
                <CaseTeamSelector teamRoles={data.roles} />
              </div>
            }
          </Paper>
        }
      </div>);
    }

    return (
      <Paper style={{ padding: 30, paddingTop: 10, margin: '65px 15px 15px 15px' }}>
        {detailBody}
      </Paper>
    );
  }
}

Details.propTypes = {
  actionError: React.PropTypes.object,
  caseData: React.PropTypes.object,
  caseId: React.PropTypes.string,
  caseLastModified: React.PropTypes.string,
  caseModelSchema: React.PropTypes.object,
  data: React.PropTypes.object.isRequired,
  definition: React.PropTypes.string,
  error: React.PropTypes.object,
  initDetails: React.PropTypes.func,
  isFetching: React.PropTypes.bool.isRequired,
  resetDetails: React.PropTypes.func,
  showFeedbackForm: React.PropTypes.bool,
  startCaseModel: React.PropTypes.func
};

Details.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Details;
