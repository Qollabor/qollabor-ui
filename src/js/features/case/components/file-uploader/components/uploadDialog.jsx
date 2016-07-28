import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

export default class UploadDialog extends React.Component {

  render() {
    let bodyDialog = null;
    if (this.props.bodyType !== 'fileNotSupported') {
      bodyDialog = (
        <div>
          <img
            alt=""
            src={this.props.imageThumbnails.length ?
              this.props.imageThumbnails[0].dataURL : ''}
          />
          <br/>
          <div>
            Name:
            <TextField
              hintText="Hint Text"
              ref="imageTitle"
            />
          </div>
        </div>
      );
    } else {
      bodyDialog = (
        <div>
          <p>Sorry, only the following file types are supported</p>
          {this.props.allowedFileTypes}
        </div>
      );
    }

    return (
      <Dialog
        title={this.props.title}
        modal={false}
        open={this.props.show}
        actions={this.props.actions}
      >
        {bodyDialog}
      </Dialog>
    );
  }
}

UploadDialog.propTypes = {
  title: React.PropTypes.string,
  show: React.PropTypes.bool,
  actions: React.PropTypes.node,
  bodyType: React.PropTypes.string,
  allowedFileTypes: React.PropTypes.array,
  imageThumbnails: React.PropTypes.array
};
