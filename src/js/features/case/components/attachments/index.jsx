import React from 'react';
import { TitledListBox } from '../../../../components/titled-list-box';

export class CaseAttachments extends React.Component {
  render() {
    return (
      <TitledListBox
        title="Documents"
        items={this.props.attachments.map(item => {
          item.icon = 'description';
          item.color = 'olive';
          return item;
        })}
        isFetching={this.props.isFetching}
        error={this.props.error}
        labelField="title"
      />
    );
  }
}

CaseAttachments.propTypes = {
  attachments: React.PropTypes.array,
  isFetching: React.PropTypes.bool.isRequired,
  error: React.PropTypes.object.isRequired
};

export default CaseAttachments;
