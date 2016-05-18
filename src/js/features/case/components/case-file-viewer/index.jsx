import React from 'react';
import { FlatButton, Dialog } from 'material-ui';

import { JsonPrinter } from './jsonPrinter';

export class CaseFileViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.caseId);
    }
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
          style={{ float: 'right' }}
          label="Open case"
          primary={true}
          onTouchTap={this.handleOpen.bind(this)}
        />

        <div style={{ clear: 'both' }}/>

        <Dialog
          title="Case details"
          modal={true}
          open={this.state.open}
          actions={actions}
          onRequestClose={this.handleClose.bind(this)}
          bodyStyle={{ paddingTop: '10px', paddingBottom: '10px' }}
        >
          <div style={{ maxHeight: '280px', overflow: 'auto', outline: '1px solid #ccc' }}>
            <JsonPrinter object={this.props.case}/>
          </div>
        </Dialog>
      </div>
    );
  }
}

CaseFileViewer.propTypes = {
  case: React.PropTypes.object.isRequired,
  onMount: React.PropTypes.func
};

export default CaseFileViewer;
