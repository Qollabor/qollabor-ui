import React from 'react';
import { Card, CardHeader, CardText, Badge } from 'material-ui';
import PlanItems from './planItems';
import registry from 'app-registry';

const badgePositionStyle = {
  position: 'absolute',
  right: '50px',
  bottom: '0px'
};

const badgeStyle = {
  backgroundColor: '#777'
};

const headerStyle = {
  backgroundColor: 'rgb(232, 232, 232)'
};

class CasePlanItems extends React.Component {
  getLocalFormattedDate (date) {
    return registry.get('helpers').getLocalDateTime(date);
  }
  render () {
    const { items } = this.props;
    const numPlanItems = items.length;
    return (
      <Card style={{ margin: '10px' }}>
        <CardHeader
          title="Plan Items"
          actAsExpander={true}
          showExpandableButton={true}
          initiallyExpanded={false}
          style={headerStyle}
          children={<Badge
            badgeContent={numPlanItems} primary={true} badgeStyle={badgeStyle} style={badgePositionStyle}
          />}
        />
        <CardText expandable={true}>
          <PlanItems items={items} />
        </CardText>
      </Card>
    );
  }
}
CasePlanItems.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default CasePlanItems;
