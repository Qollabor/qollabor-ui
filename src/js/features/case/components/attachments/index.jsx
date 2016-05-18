import React from 'react';
import { RefreshIndicator, FontIcon } from 'material-ui';

import styles from '../styles';

const iconStyle = {
  color: 'olive'
};

export class CaseAttachments extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.caseId);
    }
  }

  render() {
    const legend = (<legend style={styles.legend}>Documents</legend>);

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

    return (
      <div>
        {legend}

        <section style={styles.section}>
          {this.props.attachments.map((attachment, index) => (
            <div key={index}>
              <FontIcon className="material-icons" style={iconStyle}>description</FontIcon>
              <span>{attachment.title}</span>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

CaseAttachments.propTypes = {
  caseId: React.PropTypes.string.isRequired,
  attachments: React.PropTypes.array,
  onMount: React.PropTypes.func,
  isFetching: React.PropTypes.bool.isRequired,
  error: React.PropTypes.object.isRequired
};

export default CaseAttachments;
