import React from 'react';
import CaseModelDetail from '../features/case-models/components/details';
import CaseModelBreadcrumb from '../features/case-models/components/breadcrumb';

class CaseModelDetailPage extends React.Component {

  render() {
    return (
      <div>
        <CaseModelBreadcrumb />
        <CaseModelDetail />
      </div>
    );
  }
}

export default CaseModelDetailPage;
