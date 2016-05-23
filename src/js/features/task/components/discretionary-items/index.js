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
          icon: 'view_list',
          action: () => registry.get('store')
            .dispatch({
              type: 'CASE:DISCRETIONARY_ITEMS:REQUEST_PLAN',
              planItemId: item.id,
              caseId: item.caseInstanceId
            })
        })
      ),
    error: state.case.discretionaryItems.get('error').toJS()
  };
}

export const DiscretionaryItems = connect(mapStateToProps, null)(DiscretionaryItemsComponent);
