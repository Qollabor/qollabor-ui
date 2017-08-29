import React from 'react';
import PropTypes from 'prop-types';
import PlanItem from './planItem';
import { List } from 'material-ui';

class PlanItems extends React.Component {
  render () {
    const items = this.props.items.map((item, index) =>
      <PlanItem key={index} item={item} />);
    return <List>{items}</List>;
  }
}
PlanItems.propTypes = {
  items: PropTypes.array.isRequired
};
export default PlanItems;
