import React from 'react';
import { TitledBox } from '../../../../components/titled-box';
import { CaseFileViewer } from '../case-file-viewer';

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

        <CaseFileViewer case={this.props.case}/>
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
