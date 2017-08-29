import React from 'react';
import PropTypes from 'prop-types';
import { TitledBox } from '../../../../cafienne-ui-elements';
import { RaisedButton } from 'material-ui';
import styles from '../styles';

class CaseInformationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.openDetailPage = this.openDetailPage.bind(this);
  }

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
          onClick={this.openDetailPage}
        />
      </div>
    );
  }
}

CaseInformationComponent.propTypes = {
  case: PropTypes.object
};

CaseInformationComponent.contextTypes = {
  router: PropTypes.object.isRequired
};

export const CaseInformation = TitledBox(CaseInformationComponent);
CaseInformation.displayName = 'CaseInformation';

export default CaseInformation;
