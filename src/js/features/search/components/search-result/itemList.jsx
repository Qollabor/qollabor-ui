import React from 'react';
import { Item } from './item';
import { List } from 'material-ui';

class ItemList extends React.Component {
  render() {
    const items = this.props.items.map(item =>
      <Item itemType={item.docType} score={item.score} item={item.document} />);
    return <List>{items}</List>;
  }
}
ItemList.propTypes = {
  items: React.PropTypes.array.isRequired
};
export default ItemList;
