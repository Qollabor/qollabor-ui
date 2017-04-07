import CaseDetailComponent from './caseDetail';
import { connect } from 'react-redux';
import registry from 'app-registry';

function mapStateToProps(state) {
  return {
    caseDocument: state.case.case.toJS(),
    discretionaryItems: state.case.discretionaryItems.get('items').toJS()
      .map(
        (item) => Object.assign({}, item, {
          color: '#388AC3',
          icon: 'playlist_add',
          action: () => registry.get('store')
            .dispatch({
              type: 'CASE:DISCRETIONARY_ITEMS:REQUEST_PLAN',
              definitionId: item.id,
              planItemName: item.name,
              parentId: item.parentId,
              caseId: state.case.discretionaryItems.get('caseInstanceId')
            })
        })
      ),
    caseTeam: state.case.caseTeam.toJS()
  };
}

export default connect(mapStateToProps)(CaseDetailComponent);
