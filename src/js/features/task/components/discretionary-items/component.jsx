import React from 'react';
import { TitledListBox } from '../../../../components/titled-list-box';

export class DiscretionaryItems extends React.Component {

  render() {
    return (
      <TitledListBox
        title="Discretionary items"
        items={this.props.discretionaryItems}
        isFetching={this.props.isFetching}
        error={this.props.error}
        labelField="taskName"
        emptyListMessage={this.props.emptyListMessage}
      />
    );
  }
}

DiscretionaryItems.displayName = 'DiscretionaryItems';

DiscretionaryItems.propTypes = {
  emptyListMessage: React.PropTypes.string,
  discretionaryItems: React.PropTypes.array.isRequired
};

export default DiscretionaryItems;
