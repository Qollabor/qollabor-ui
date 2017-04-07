import React from 'react';
import CaseDocument from './components/case-document/caseDocument';
import CaseDiscretionaryItems from './components/discretionary-items/caseDiscretionaryItems';

const CaseDetail = ({ caseDocument, discretionaryItems, caseTeam }) => (
  <div>
    {<CaseDocument document={caseDocument} team={caseTeam} />}
    {discretionaryItems.length !== 0 && <CaseDiscretionaryItems items={discretionaryItems} />}
  </div>
);

CaseDetail.propTypes = {
  caseDocument: React.PropTypes.object,
  caseTeam: React.PropTypes.object,
  discretionaryItems: React.PropTypes.array
};

export default CaseDetail;
