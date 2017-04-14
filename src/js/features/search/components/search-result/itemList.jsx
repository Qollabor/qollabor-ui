import React from 'react';
import { List } from 'material-ui';
import { Item } from './item';

class ItemList extends React.Component {
  render() {
    const items = this.props.items.map(item =>
      <Item key={item.document.id} itemType={item.docType} score={item.score} item={item.document} />);
    return <List>{items}</List>;
  }
}
ItemList.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
export default ItemList;
