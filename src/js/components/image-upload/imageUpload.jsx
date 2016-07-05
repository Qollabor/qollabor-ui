import React from 'react';
import UserAvatar from '../user-avatar';

export class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', dataUrl: '', showSaveBtn: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.resizeAndSaveImage(this.state.dataUrl, 100, 100);
  }

  resizeAndSaveImage(dataURL, width, height) {
    const sourceImage = new Image();
    const self = this;

    sourceImage.onload = function() {
      // Create a canvas with the desired dimensions
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      // Scale and draw the source image to the canvas
      canvas.getContext('2d').drawImage(sourceImage, 0, 0, width, height);

      // Convert the canvas to a data URL in JPG format
      self.props.onUploadHandler(canvas.toDataURL('image/png', 1.0));
    };

    sourceImage.src = dataURL;
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        dataUrl: reader.result,
        showSaveBtn: true
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { user } = this.props;
    const { dataUrl, showSaveBtn } = this.state;

    return (
      <div className="previewComponent">
        <div>
          <UserAvatar user={user} avatar={dataUrl}/>
        </div>
        <label htmlFor="userFile"><u style={{ cursor: 'pointer', fontSize: '13px' }}>Change</u></label>
        <label htmlFor="submitButton" style={{ marginLeft: '20px', display: (showSaveBtn === true) ? '' : 'none' }}>
          <u style={{ cursor: 'pointer', fontSize: '13px' }}>Save</u></label>
        <div style={{ display: 'none' }}>
          <input style={{ display: 'none' }} id="userFile" type="file" onChange={(e) => this.handleImageChange(e)} />
          <button id="submitButton" onClick={(e) => this.handleSubmit(e)} />
        </div>
      </div>
    );
  }
}

ImageUpload.displayName = 'ImageUpload';

ImageUpload.propTypes = {
  user: React.PropTypes.object.isRequired,
  onUploadHandler: React.PropTypes.func.isRequired
};

export default ImageUpload;
