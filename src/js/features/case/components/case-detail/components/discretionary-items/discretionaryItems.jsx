import React from 'react';
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
  items: React.PropTypes.array.isRequired
};
export default DiscretionaryItems;
