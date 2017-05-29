import React from 'react';
import PropTypes from 'prop-types';
import CaseHeader from './caseHeader';
import CasePlanItems from './casePlanItems';

class CaseDocument extends React.Component {

  getCaseDetailData(caseDocument) {
    if (caseDocument && caseDocument.planitems) {
      const casePlanItem = caseDocument.planitems.find(planItem => planItem.type === 'CasePlan');

      const lastModifiedPlanItem = caseDocument.planitems[caseDocument.planitems.length - 1];
      const lastModified =
        lastModifiedPlanItem.lastModified
        ? lastModifiedPlanItem.lastModified
        : caseDocument.lastModified;
      return {
        ...caseDocument,
        name: casePlanItem.name,
        user: casePlanItem.user,
        status: casePlanItem.currentState,
        planitems: this.getPlanItems(caseDocument.planitems),
        lastModified,
        lastModifiedBy: caseDocument.lastModifiedBy
      };
    }
    return null;
  }

  getPlanItems(planItems) {
    // sort plan items
    const planItemsSorted = planItems.sort((item1, item2) =>
    new Date(item1.lastModified) - new Date(item2.lastModified));
    return planItemsSorted;
  }

  render () {
    const { document, userDetails, caseTeamUsers } = this.props;
    const caseDoc = this.getCaseDetailData(document.item);
    return (
      <div>
        {caseDoc && <CaseHeader
          definition={caseDoc.definition}
          status={caseDoc.status}
          lastModified={caseDoc.lastModified}
          lastModifiedBy={caseDoc.lastModifiedBy}
          user={caseDoc.user}
          team={caseDoc.team}
          name={caseDoc.name}
          file={caseDoc.file}
          userDetails={userDetails}
          caseTeamUsers={caseTeamUsers}
          planItems={caseDoc.planitems}
        />}
        {caseDoc && caseDoc.planitems && <CasePlanItems items={caseDoc.planitems} />}
      </div>
    );
  }
}

CaseDocument.propTypes = {
  caseTeamUsers: PropTypes.array,
  document: PropTypes.object.isRequired,
  userDetails: PropTypes.object
};

export default CaseDocument;
