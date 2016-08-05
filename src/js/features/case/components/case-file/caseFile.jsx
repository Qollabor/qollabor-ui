import React from 'react';
import { FlatButton, Dialog } from 'material-ui';
import JSONPretty from 'react-json-pretty';

export default class CaseFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
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
        onTouchTap={this.handleClose.bind(this)}
      />
    ];
    return (
      <div>
        <FlatButton label="Casefile" onTouchTap={this.handleOpen.bind(this)} />
        <Dialog
          title="Casefile"
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <div>
            {<JSONPretty id="json-pretty" json={this.props.file} />}
          </div>
        </Dialog>
      </div>
    );
  }
}
