import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, FontIcon } from 'material-ui';
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
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    if (this.props.item.action) {
      this.props.item.action();
    }
  }

  render () {
    const item = this.props.item;
    return (
      <ListItem
        key={item.id}
        leftIcon={<PlanItemIcon type={item.type} />}
        rightIcon={
          <FontIcon
            title={'Add to Plan'}
            style={{ cursor: 'pointer' }}
            color="#388AC3" hoverColor="#E24949" className="material-icons"
            onClick={this.handleOnClick}
          >
            playlist_add
          </FontIcon>
        }
        primaryText={item.name}
        secondaryText={item.parent}
        disabled={true}
      />);
  }
}

DiscretionaryItem.propTypes = {
  item: PropTypes.object
};

PlanItemIcon.propTypes = {
  type: PropTypes.string
};

DiscretionaryItem.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DiscretionaryItem;
