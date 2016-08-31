import { connect } from 'react-redux';
import registry from 'app-registry';

import DiscretionaryItemsComponent from './component';

function mapStateToProps(state) {
  return {
    isFetching: state.case.discretionaryItems.get('isFetching'),
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
    error: state.case.discretionaryItems.get('error').toJS()
  };
}

export const DiscretionaryItems = connect(mapStateToProps, null)(DiscretionaryItemsComponent);
