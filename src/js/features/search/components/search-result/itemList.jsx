import React from 'react';
import PropTypes from 'prop-types';
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
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default ItemList;
