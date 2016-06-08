import { connect } from 'react-redux';
import CaseModelBreadcrumbComponent from './component';

function mapStateToProps(state) {
  const caseModelName = state.casemodel.details.get('name');

  return {
    items: [
      {
        label: 'Case Models',
        url: '#/casemodels'
      },
      {
        label: caseModelName
      }
    ]
  };
}

export default connect(mapStateToProps, null)(CaseModelBreadcrumbComponent);
