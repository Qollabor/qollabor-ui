import React from 'react';

export default class DialogNotSupported extends React.Component {

  getList() {
    const listBody = this.props.allowedFileTypes.map((fileType, index) => (<li key={index}>{fileType}</li>));
    return listBody;
  }

  render() {
    return (<div>
      <p>Sorry, only the following file types are supported</p>
      {this.getList()}
    </div>);
  }
}

DialogNotSupported.propTypes = {
  allowedFileTypes: React.PropTypes.array
};
