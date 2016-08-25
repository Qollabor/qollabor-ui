import React from 'react';
import CaseDocument from './components/case-document/caseDocument';
import CaseDiscretionaryItems from './components/discretionary-items/caseDiscretionaryItems';

class CaseDetail extends React.Component {
  componentWillMount () {
    if (this.props.initCaseDocument) {
      this.props.initCaseDocument();
    }
  }
  render () {
    const { caseDocument, discretionaryItems, caseTeam } = this.props;
    return (
      <div>
        {<CaseDocument document={caseDocument} team={caseTeam} />}
        {discretionaryItems.length !== 0 && <CaseDiscretionaryItems items={discretionaryItems} />}
      </div>
    );
  }
}

CaseDetail.propTypes = {
  initCaseDocument: React.PropTypes.func.isRequired
};

export default CaseDetail;
