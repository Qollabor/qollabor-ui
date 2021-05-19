import React from 'react';
import PropTypes from 'prop-types';
import { TitledListBox } from '../../../../qollabor-ui-elements';

export class CaseAttachments extends React.Component {
  render() {
    return (
      <TitledListBox
        title="Documents"
        items={this.props.attachments.map(item => ({
          ...item,
          icon: 'description',
          color: 'olive'
        }))}
        isFetching={this.props.isFetching}
        error={this.props.error}
        labelField="title"
      />
    );
  }
}

CaseAttachments.propTypes = {
  attachments: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired
};

export default CaseAttachments;
