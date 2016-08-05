import React from 'react';
import CaseHeader from './caseHeader';
import CasePlanItems from './casePlanItems';

class CaseDocument extends React.Component {

  getCaseDetailData(caseDocument) {
    if (caseDocument && caseDocument.planitems) {
      const casePlanItem = caseDocument.planitems.find((planItem) => planItem.type === 'CasePlan');
      caseDocument.name = casePlanItem.name;
      caseDocument.user = casePlanItem.user;
      caseDocument.status = casePlanItem.currentState;
      caseDocument.lastModified = casePlanItem.lastModified;
      caseDocument.planitems = this.getPlanItems(caseDocument.planitems);
      return caseDocument;
    }
    return null;
  }

  getPlanItems(planItems) {
    // sort plan items
    const planItemsSorted = planItems.sort((item1, item2) =>
    new Date(item2.lastModified) - new Date(item1.lastModified));
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
          user={caseDoc.user}
          team={caseDoc.team}
          name={caseDoc.name}
          file={caseDoc.file}
          userDetails={userDetails}
          caseTeamUsers={caseTeamUsers}
        />}
        {caseDoc && caseDoc.planitems && <CasePlanItems items={caseDoc.planitems} />}
      </div>
    );
  }
}

CaseDocument.propTypes = {
  document: React.PropTypes.object.isRequired
};

export default CaseDocument;
