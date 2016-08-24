import React from 'react';
import { Card, CardHeader, CardText, Badge } from 'material-ui';
import DiscretionaryItems from './discretionaryItems';
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

class CaseDiscretionaryItems extends React.Component {
  getLocalFormattedDate (date) {
    return registry.get('helpers').getLocalDateTime(date);
  }
  render () {
    const { items } = this.props;
    const numOfItems = items && items.length;
    return (
      <Card style={{ margin: '10px' }} initiallyExpanded={false}>
        <CardHeader
          title="Available to plan"
          actAsExpander={true}
          showExpandableButton={true}
          style={headerStyle}
          children={numOfItems && <Badge
            badgeContent={numOfItems} primary={true} badgeStyle={badgeStyle} style={badgePositionStyle}
          />}
        />
        <CardText expandable={true}>
          <DiscretionaryItems items={items} />
        </CardText>
      </Card>
    );
  }
}
CaseDiscretionaryItems.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default CaseDiscretionaryItems;
