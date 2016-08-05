import React from 'react';
import { ListItem } from 'material-ui';
import { CMMNIcon } from '../../../../../../components/cmmn-icons';

const cmmnIconStyle = {
  color: 'black',
  fontSize: 24,
  fontWeight: 'bold',
  padding: 0,
  position: 'absolute',
  top: '12px',
  left: '4px',
  margin: '12px'
};

const PlanItemIcon = ({ type }) => <CMMNIcon
  itemName={type}
  style={cmmnIconStyle}
/>;

class DiscretionaryItem extends React.Component {
  render () {
    const item = this.props.item;
    return (
      <ListItem
        key={item.id}
        leftIcon={<PlanItemIcon type={item.type} />}
        primaryText={item.name}
        secondaryText={item.parent}
      />);
  }
}
DiscretionaryItem.contextTypes = {
  router: React.PropTypes.object.isRequired
};
export default DiscretionaryItem;
