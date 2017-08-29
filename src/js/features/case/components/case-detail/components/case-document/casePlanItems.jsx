import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, Badge } from 'material-ui';
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

const CasePlanItems = ({ items }) => {
  const numPlanItems = items.length;

  return (
    <Card style={{ margin: '10px' }} initiallyExpanded={true}>
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
};

CasePlanItems.propTypes = {
  items: PropTypes.array.isRequired
};

export default CasePlanItems;
