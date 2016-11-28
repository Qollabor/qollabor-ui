import React from 'react';
import { TitledBox } from '../../../../cafienne-ui-elements';
import { RaisedButton } from 'material-ui';
import styles from '../styles';

class CaseInformationComponent extends React.Component {
  openDetailPage() {
    const caseId = this.props.case.id;
    this.context.router.push(`/cases/${caseId}`);
  }
  render() {
    return (
      <div>
        <section style={styles.section}>
          <div style={styles.title}>
            <em>Definition</em>
          </div>
          <div style={styles.label}>
            {this.props.case.definition}
          </div>
        </section>

        <RaisedButton
          label="Open case"
          primary={true}
          onClick={this.openDetailPage.bind(this)}
        />
      </div>
    );
  }
}

CaseInformationComponent.propTypes = {
  case: React.PropTypes.object
};

CaseInformationComponent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export const CaseInformation = TitledBox(CaseInformationComponent);
CaseInformation.displayName = 'CaseInformation';

export default CaseInformation;
