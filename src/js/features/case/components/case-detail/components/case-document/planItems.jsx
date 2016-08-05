import React from 'react';
import PlanItem from './planItem';
import { List } from 'material-ui';

class PlanItems extends React.Component {
  render () {
    let items = this.props.items.map(item =>
      <PlanItem item={item} />);
    return <List>{items}</List>;
  }
}
PlanItems.propTypes = {
  items: React.PropTypes.array.isRequired
};
export default PlanItems;
