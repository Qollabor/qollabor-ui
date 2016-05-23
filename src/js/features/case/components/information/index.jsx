import React from 'react';
import { TitledBox } from '../../../../components/titled-box';
import { CaseFileViewer } from '../../../case';

import styles from '../styles';

export class CaseInformation extends React.Component {
  render() {
    return (
      <TitledBox
        title="Case Information"
        isFetching={this.props.isFetching || false}
        error={this.props.error || {}}
      >
        <section style={styles.section}>
          <div style={styles.title}>
            <em>Definition</em>
          </div>
          <div style={styles.label}>
            {this.props.case.definition}
          </div>
        </section>

        <CaseFileViewer caseId={this.props.caseId}/>
      </TitledBox>
    );
  }
}

CaseInformation.propTypes = {
  case: React.PropTypes.object,
  isFetching: React.PropTypes.bool.isRequired,
  error: React.PropTypes.object.isRequired
};

export default CaseInformation;
