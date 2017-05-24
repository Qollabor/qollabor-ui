import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui';
import { ActionList } from 'material-ui/svg-icons';
import { blue500 } from 'material-ui/styles/colors';
import registry from 'app-registry';
import ItemBody from './itemBody';
import ItemHeader from './itemHeader';
import ItemTextField from './itemTextField';

class TaskItem extends React.Component {

  getLocalFormattedDate (date) {
    return registry.get('helpers').getLocalDateTime(date);
  }
  openTaskDetailPage () {
    const taskId = this.props.item.id;
    const caseId = this.props.item.caseInstanceId;

    this.context.router.push(`/tasks/${taskId}?caseId=${caseId}`);
  }
  render () {
    const task = this.props.item;
    return (
      <ListItem
        key={this.props.item.id}
        primaryText={<ItemHeader title={task.taskName} />}
        leftIcon={<ActionList color={blue500} />}
        onTouchTap={this.openTaskDetailPage.bind(this)}
        secondaryText={
          <ItemBody>
            <ItemTextField
              value={task.assignee || ''}
              name="Assignee"
            />
            <ItemTextField
              value={task.createdBy}
              name="Created By"
            />
            <ItemTextField
              value={this.getLocalFormattedDate(task.createdOn)}
              name="Created On"
            />
          </ItemBody>}
      />);
  }
}

TaskItem.propTypes = {
  item: PropTypes.object
};

TaskItem.contextTypes = {
  router: PropTypes.object.isRequired
};
export default TaskItem;
