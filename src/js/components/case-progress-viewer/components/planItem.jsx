import React from 'react';
import { StatusCapsule } from '../../capsules';
import registry from 'app-registry';

const planItemLabelStyle = {
  fontSize: 'x-small',
  fontWeight: '500'
};

const style = {
  overflow: 'none',
  margin: '0px',
  height: '34px',
  padding: '2px'
};

class PlanItem extends React.Component {

  getLastModified (date) {
    return registry.get('helpers').getTimeAgo(date);
  }

  render () {
    const { item } = this.props;
    return (
      <div style={style}>
        <div style={planItemLabelStyle}><b>{item.name}</b></div>
        <div style={{ display: 'flex' }}>
          <div><label style={planItemLabelStyle}>{item.user}, </label></div>
          <div><label style={planItemLabelStyle}>{this.getLastModified(item.lastModified)}, </label></div>
          <div>
            <StatusCapsule
              status={item.currentState} statusStyle={planItemLabelStyle}
            >{item.currentState}
            </StatusCapsule>
          </div>
        </div>
      </div>
    );
  }
}

export default PlanItem;
