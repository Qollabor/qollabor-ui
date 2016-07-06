import React from 'react';
import { Avatar } from 'material-ui';

export class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imageUrl: 'Avatar', showSaveBtn: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.onUploadHandler();
  }

  handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imageUrl: reader.result,
        showSaveBtn: true
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const { imageUrl, showSaveBtn } = this.state;
    return (
      <div className="previewComponent">
        <div>
          <Avatar
            src={imageUrl}
            size={100}
            alt="Avatar"
          />
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
  onUploadHandler: React.PropTypes.func.isRequired
};

export default ImageUpload;
