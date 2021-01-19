import React from 'react';
import PropTypes from 'prop-types';
import CaseDocument from './components/case-document/caseDocument';
import CaseDiscretionaryItems from './components/discretionary-items/caseDiscretionaryItems';

const CaseDetail = ({ caseDocument, discretionaryItems, caseTeam }) => (<div>
  {<CaseDocument document={caseDocument} team={caseTeam} />}
  {discretionaryItems.length !== 0 && <CaseDiscretionaryItems items={discretionaryItems} />}
</div>);

CaseDetail.propTypes = {
  caseDocument: PropTypes.object,
  caseTeam: PropTypes.object,
  discretionaryItems: PropTypes.array
};

export default CaseDetail;
