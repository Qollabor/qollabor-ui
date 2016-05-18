export { reducers } from './reducers';
export * from './sagas';

import { connect } from 'react-redux';

import {
  CaseInformation as CaseInformationComponent,
  CaseAttachments as CaseAttachmentsComponent,
  CaseFileViewer as CaseFileViewerComponent
} from './components';

function mapCaseStateToProps(state) {
  return {
    isFetching: state.case.case.get('isFetching'),
    case: state.case.case.get('item'),
    error: state.case.case.get('error').toJS()
  };
}

function mapAttachmentsStateToProps(state) {
  return {
    isFetching: state.case.attachments.get('isFetching'),
    attachments: state.case.attachments.get('items').toJS(),
    error: state.case.attachments.get('error').toJS()
  };
}

function mapCaseFileViewerStateToProps(state) {
  return {
    case: state.case.case.get('item')
  };
}

export const CaseInformation = connect(mapCaseStateToProps, null)(CaseInformationComponent);
export const CaseAttachments = connect(mapAttachmentsStateToProps, null)(CaseAttachmentsComponent);
export const CaseFileViewer = connect(mapCaseFileViewerStateToProps, null)(CaseFileViewerComponent);
