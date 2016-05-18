import React from 'react';
import { RefreshIndicator, FontIcon } from 'material-ui';

import styles from '../styles';

const iconStyle = {
  color: 'olive',
  display: 'table-cell',
  verticalAlign: 'middle',
  paddingRight: '5px'
};

export class CaseAttachments extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this.props.caseId);
    }
  }

  render() {
    const legend = (<legend style={styles.legend}>Documents</legend>);

    let content;

    if (this.props.isFetching) {
      content = (
        <div style={{ position: 'relative', height: '50px', width: '50px', margin: '10px auto' }}>
          <RefreshIndicator
            size={30}
            left={5}
            top={5}
            status="loading"
          />
        </div>
      );
    } else if (this.props.error.isError) {
      content = (
        <div style={styles.error}>{this.props.error.message}</div>
      );
    } else {
      content = (
        <section style={styles.section}>
          {this.props.attachments.map((attachment, index) => (
            <div key={index} style={{ marginBottom: '3px' }}>
              <FontIcon className="material-icons" style={iconStyle}>description</FontIcon>
              <span style={{ display: 'table-cell', verticalAlign: 'middle', paddingTop: '2px' }}>{attachment.title}</span>
            </div>
          ))}
        </section>
      );
    }

    return (
      <div>
        {legend}

        {content}
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
