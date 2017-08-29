import React from 'react';
import PropTypes from 'prop-types';
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
  emptyListMessage: PropTypes.string,
  discretionaryItems: PropTypes.array.isRequired,
  error: PropTypes.object,
  isFetching: PropTypes.bool
};

export default DiscretionaryItems;
