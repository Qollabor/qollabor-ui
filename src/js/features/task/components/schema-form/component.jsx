import React from 'react';
import { Paper, FlatButton, RaisedButton, Dialog } from 'material-ui';
import { Form } from '../../../../components/schema-form/form';

const customContentStyle = {
  width: '400px',
  maxWidth: 'none'
};

export class TaskModelSchemaForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      remindUser: true
    };
  }

  handleOpen() {
    if (this.state.remindUser && this.props.taskDetails.owner === null) {
      this.setState({
        open: true
      });
    }
  }

  handleClose() {
    this.setState({
      open: false,
      remindUser: false
    });
  }

  claimTaskAction() {
    const taskId = this.props.taskDetails.id;
    this.props.executeTaskAction(taskId, 'claim');
    this.handleClose();
  }

  render() {
    const actions = [
      <RaisedButton
        label="Claim"
        primary={true}
        onTouchTap={this.claimTaskAction.bind(this)}
      />,
      <FlatButton
        label="Cancel"
        onTouchTap={this.handleClose.bind(this)}
      />
    ];

    return (
      <div>
        <Paper style={{ padding: 5, marginTop: 15, minHeight: 300 }} onTouchTap={this.handleOpen.bind(this)}>
          <Form
            buttonList={this.props.buttonList}
            schema={this.props.schema}
            uiSchema={this.props.uiSchema}
            formData={this.props.formData}
            onSubmit={this.props.onSubmit}
            disabled={this.props.disabled}
          />
        </Paper>
        <Dialog
          actions={actions}
          modal={false}
          contentStyle={customContentStyle}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          You must claim the task to proceed.
        </Dialog>
      </div>
    );
  }
}

TaskModelSchemaForm.propTypes = {
  buttonList: React.PropTypes.array,
  disabled: React.PropTypes.bool,
  executeTaskAction: React.PropTypes.func,
  formData: React.PropTypes.object,
  schema: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  taskDetails: React.PropTypes.object,
  uiSchema: React.PropTypes.object
};

export default TaskModelSchemaForm;
