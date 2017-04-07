import React from 'react';
import { ListItem } from 'material-ui';
import registry from 'app-registry';
import { CMMNIcon } from '../../../../../../components/cmmn-icons';
import { StatusCapsule } from '../../../../../../components/capsules';

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

const style = {
  overflow: 'none',
  margin: '0px'
};

const PlanItemIcon = ({ type }) => <CMMNIcon
  itemName={type}
  style={cmmnIconStyle}
/>;

class PlanItem extends React.Component {
  constructor(props) {
    super(props);
    this.openTaskDetailPage = this.openTaskDetailPage.bind(this);
  }

  getLocalFormattedDate (date) {
    return registry.get('helpers').getLocalDateTime(date);
  }

  getLastModified (date) {
    return registry.get('helpers').getTimeAgo(date);
  }

  openTaskDetailPage () {
    const type = this.props.item.type;
    if (type === 'HumanTask') {
      const status = this.props.item.currentState;
      const taskId = this.props.item.id;
      const caseId = this.props.item.caseInstanceId;
      if (status === 'Active' || status === 'Completed') {
        this.context.router.push(`/tasks/${taskId}?caseId=${caseId}`);
      }
    } else if (type === 'CaseTask') {
      const status = this.props.item.currentState;
      const caseId = this.props.item.id;
      if (status === 'Active' || status === 'Completed') {
        this.context.router.push(`/cases/${caseId}`);
      }
    }
  }

  render () {
    const item = this.props.item;
    return (
      <ListItem
        key={this.props.item.id}
        leftIcon={<PlanItemIcon type={item.type} />}
        primaryText={item.name}
        secondaryText={
          <div style={style}>
            <label>{item.user}, </label>
            <label>{this.getLastModified(item.lastModified)}, </label>
            <StatusCapsule
              status={item.currentState}
            >{item.currentState}
            </StatusCapsule>
          </div>
        }
        onTouchTap={this.openTaskDetailPage}
      />);
  }
}

PlanItemIcon.propTypes = {
  type: React.PropTypes.string
};

PlanItem.propTypes = {
  item: React.PropTypes.object
};

PlanItem.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PlanItem;
