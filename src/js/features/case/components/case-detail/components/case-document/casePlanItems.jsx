import React from 'react';
import { Card, CardHeader, CardText, Badge } from 'material-ui';
import registry from 'app-registry';
import PlanItems from './planItems';

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
      <Card style={{ margin: '10px' }} initiallyExpanded={false}>
        <CardHeader
          title="Planned Items"
          actAsExpander={true}
          showExpandableButton={true}
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
