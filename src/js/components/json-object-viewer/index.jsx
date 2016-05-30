import React from 'react';
import { FlatButton, Dialog } from 'material-ui';

import { JsonPrinter } from './jsonPrinter';

export class JsonObjectViewer extends React.Component {
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
      <FlatButton label="Close" onTouchTap={this.handleClose.bind(this)}/>
    ];

    return (
      <div>
        <FlatButton
          style={this.props.buttonStyle || {}}
          label={this.props.buttonTitle}
          primary={this.props.buttonIsPrimary || false}
          onTouchTap={this.handleOpen.bind(this)}
        />

        <div style={{ clear: 'both' }}/>

        <Dialog
          title={this.props.modalTitle}
          modal={true}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose.bind(this)}
          bodyStyle={{ paddingTop: '10px', paddingBottom: '10px' }}
        >
          <div style={{ maxHeight: '280px', overflow: 'auto', outline: '1px solid #ccc' }}>
            <JsonPrinter object={this.props.object}/>
          </div>
        </Dialog>
      </div>
    );
  }
}

JsonObjectViewer.propTypes = {
  modalTitle: React.PropTypes.string.isRequired,
  buttonTitle: React.PropTypes.string.isRequired,
  buttonStyle: React.PropTypes.object,
  buttonIsPrimary: React.PropTypes.boolean,
  object: React.PropTypes.object.isRequired
};

export default JsonObjectViewer;
