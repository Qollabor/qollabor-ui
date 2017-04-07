import React from 'react';
import { FlatButton, Dialog } from 'material-ui';
import CaseFileViewer from './caseFileViewer';

export default class CaseFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div>
        <FlatButton label="Casefile" onTouchTap={this.handleOpen} />
        <Dialog
          title="Casefile"
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <CaseFileViewer file={this.props.file} />
        </Dialog>
      </div>
    );
  }
}

CaseFile.propTypes = {
  file: React.PropTypes.object
};
