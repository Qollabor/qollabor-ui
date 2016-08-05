import React from 'react';
import DiscretionaryItem from './discretionaryItem';
import { List } from 'material-ui';

class DiscretionaryItems extends React.Component {
  render () {
    let items = this.props.items.map(item =>
      <DiscretionaryItem item={item} />);
    return <List>{items}</List>;
  }
}
DiscretionaryItems.propTypes = {
  items: React.PropTypes.array.isRequired
};
export default DiscretionaryItems;
