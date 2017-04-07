import React from 'react';
import { TitledListBox } from '../../../../cafienne-ui-elements';

export class DiscretionaryItems extends React.Component {

  render() {
    return (
      <TitledListBox
        title="Discretionary items"
        items={this.props.discretionaryItems}
        isFetching={this.props.isFetching}
        error={this.props.error}
        labelField="name"
        emptyListMessage={this.props.emptyListMessage}
      />
    );
  }
}

DiscretionaryItems.displayName = 'DiscretionaryItems';

DiscretionaryItems.propTypes = {
  emptyListMessage: React.PropTypes.string,
  discretionaryItems: React.PropTypes.array.isRequired,
  error: React.PropTypes.object,
  isFetching: React.PropTypes.bool
};

export default DiscretionaryItems;
