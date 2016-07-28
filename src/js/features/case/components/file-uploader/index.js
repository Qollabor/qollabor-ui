import * as actions from './actions';
import FileUploaderComponent from './fileUploader';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    progress: state.case.fileUploader.get('progress')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startUploadFile: (url, file, data) => {
      dispatch(actions.uploadStart(dispatch, url, file, data));
    }
  };
}

export const FileUploader = connect(mapStateToProps, mapDispatchToProps)(FileUploaderComponent);
