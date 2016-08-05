import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DialogNotSupported from './dialogNotSupported';

export default class UploadDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showUploadModal: this.props.show,
      modalTitle: '',
      uploadStart: false,
      actions: [],
      endpointUrl: 'http://localhost:8081/uploadImage/uploadImage'
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showUploadModal: nextProps.show
    });
  }

  getIconName(fileType) {
    switch (fileType) {

      case 'image/jpeg': {
        return 'image';
      }

      default:
        return 'description';
    }
  }

  getBodyDialog() {
    switch (this.props.bodyType) {

      case 'fileNotSupported': {
        this.state.modalTitle = 'Sorry image type not allowed!';
        this.state.actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleClose.bind(this)}
          />
        ];

        return (
          <Dialog
            title={this.state.modalTitle}
            modal={false}
            open={this.state.showUploadModal}
            actions={this.state.actions}
          >
            <DialogNotSupported
              allowedFileTypes={this.props.allowedFileTypes}
            />
          </Dialog>
        );
      }

      case 'imageType': {
        this.state.modalTitle = 'Upload an image?';
        this.state.actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose.bind(this)}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={this.handleUploadFile.bind(this)}
          />
        ];

        return (
          <Dialog
            title={this.state.modalTitle}
            modal={false}
            open={this.state.showUploadModal}
            actions={this.state.actions}
          >
            <div>
              <img
                alt=""
                src={this.props.imageThumbnail.length > 0 ?
                  this.props.imageThumbnail[0].dataURL : ''}
              />
              <br/>
              <div>
                Name:
                <TextField
                  hintText="Hint Text"
                  ref="fileTitle"
                  defaultValue={this.props.uploadFile.length > 0 ?
                    this.props.uploadFile[0].name : ''}
                />
              </div>
            </div>
          </Dialog>
        );
      }

      case 'documentType': {
        this.state.modalTitle = 'Upload a document?';
        this.state.actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose.bind(this)}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            onTouchTap={this.handleUploadFile.bind(this)}
          />
        ];

        return (
          <Dialog
            title={this.state.modalTitle}
            modal={false}
            open={this.state.showUploadModal}
            actions={this.state.actions}
          >
            <div>
              <div>
                Name:
                <TextField
                  hintText="Hint Text"
                  ref="fileTitle"
                  defaultValue={this.props.uploadFile.length > 0 ? this.props.uploadFile[0].name : ''}
                />
              </div>
            </div>
          </Dialog>
        );
      }

      default: {
        return null;
      }
    }
  }

  handleClose() {
    this.setState({
      modalTitle: '',
      actions: [],
      showUploadModal: false
    });
  }

  handleUploadFile() {
    const data = {
      title: this.refs.fileTitle.getValue(),
      url: this.props.uploadFile[0].name,
      caseId: this.props.caseId,
      icon: this.getIconName(this.props.uploadFile[0].type),
      user: 'admin'
    };
    this.props.startUploadFile(this.state.endpointUrl, this.props.uploadFile[0], data);
  }

  render() {
    return (this.getBodyDialog());
  }
}

UploadDialog.propTypes = {
  show: React.PropTypes.bool,
  actions: React.PropTypes.node,
  bodyType: React.PropTypes.string,
  allowedFileTypes: React.PropTypes.array,
  imageThumbnail: React.PropTypes.array,
  startUploadFile: React.PropTypes.func.isRequired,
  caseId: React.PropTypes.string,
  uploadFile: React.PropTypes.array
};
