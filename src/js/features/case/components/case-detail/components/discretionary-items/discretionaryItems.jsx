import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui';
import DiscretionaryItem from './discretionaryItem';

class DiscretionaryItems extends React.Component {
  render () {
    const items = this.props.items.map((item, index) =>
      <DiscretionaryItem key={index} item={item} />);
    return <List>{items}</List>;
  }
}
DiscretionaryItems.propTypes = {
  items: PropTypes.array.isRequired
};
export default DiscretionaryItems;
