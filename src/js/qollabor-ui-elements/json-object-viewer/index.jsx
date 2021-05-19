import React from 'react';
import PropTypes from 'prop-types';
import { FlatButton, Dialog } from 'material-ui';

import { JsonPrinter } from './jsonPrinter';

export class JsonObjectViewer extends React.Component {
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
      <FlatButton label="Close" onTouchTap={this.handleClose} />
    ];

    return (
      <div>
        <FlatButton
          style={this.props.buttonStyle || {}}
          label={this.props.buttonTitle}
          primary={this.props.buttonIsPrimary || false}
          onTouchTap={this.handleOpen}
        />

        <div style={{ clear: 'both' }} />

        <Dialog
          title={this.props.modalTitle}
          modal={true}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose}
          bodyStyle={{ paddingTop: '10px', paddingBottom: '10px' }}
        >
          <div style={{ maxHeight: '280px', overflow: 'auto', outline: '1px solid #ccc' }}>
            <JsonPrinter object={this.props.object} />
          </div>
        </Dialog>
      </div>
    );
  }
}

JsonObjectViewer.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonStyle: PropTypes.object,
  buttonIsPrimary: PropTypes.boolean,
  object: PropTypes.object.isRequired
};

export default JsonObjectViewer;
