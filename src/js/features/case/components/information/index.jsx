import React from 'react';
import { RefreshIndicator } from 'material-ui';

import styles from '../styles';

export class CaseInformation extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.caseId);
    }
  }

  render() {
    const legend = (<legend style={styles.legend}>Case Information</legend>);

    if (this.props.isFetching) {
      return (
        <div>
          {legend}

          <div style={{ position: 'relative', height: '50px', width: '50px', margin: '10px auto' }}>
            <RefreshIndicator
              size={30}
              left={5}
              top={5}
              status="loading"
            />
          </div>
        </div>
      );
    }

    if (this.props.error.isError) {
      return (
        <div>
          {legend}

          <div style={styles.error}>{this.props.error.message}</div>
        </div>
      );
    }

    const theCase = this.props.case;

    return (
      <div>
        {legend}

        <section style={styles.section}>
          <div style={styles.title}>
            <em>Definition</em>
          </div>
          <div style={styles.label}>
            {theCase.definition}
          </div>
        </section>
      </div>
    );
  }
}

CaseInformation.propTypes = {
  caseId: React.PropTypes.string.isRequired,
  case: React.PropTypes.object,
  onMount: React.PropTypes.func,
  isFetching: React.PropTypes.bool.isRequired,
  error: React.PropTypes.object.isRequired
};

export default CaseInformation;
