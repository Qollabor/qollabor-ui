import React from 'react';
import { TitledBox, JsonObjectViewer } from 'cafienne-ui-elements';

import styles from '../styles';

class CaseInformationComponent extends React.Component {
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

        <JsonObjectViewer
          buttonTitle="Open case"
          buttonIsPrimary={true}
          buttonStyle={{ float: 'right' }}
          modalTitle="Case details"
          object={this.props.case}
        />
      </div>
    );
  }
}

CaseInformationComponent.propTypes = {
  case: React.PropTypes.object
};

export const CaseInformation = TitledBox(CaseInformationComponent);
CaseInformation.displayName = 'CaseInformation';

export default CaseInformation;
