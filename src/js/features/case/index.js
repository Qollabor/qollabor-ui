import { connect } from 'react-redux';
import {
  CaseInformation as CaseInformationComponent,
  CaseAttachments as CaseAttachmentsComponent,
  CaseTeam as CaseTeamComponent
} from './components';


export { reducers } from './reducers';
export * from './sagas';

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

function mapCaseTeamStateToProps(state) {
  return {
    isFetching: state.case.caseTeam.get('isFetching'),
    caseTeam: state.case.caseTeam.get('items').toJS(),
    error: state.case.caseTeam.get('error').toJS()
  };
}

export const CaseInformation = connect(mapCaseStateToProps, null)(CaseInformationComponent);
export const CaseAttachments = connect(mapAttachmentsStateToProps, null)(CaseAttachmentsComponent);
export const CaseTeam = connect(mapCaseTeamStateToProps, null)(CaseTeamComponent);
