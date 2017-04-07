import React from 'react';
import { Badge } from 'material-ui';
import styles from '../../styles';
import theme from '../../../../themes';

class TaskStats extends React.Component {

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount();
    }
  }

  render() {
    const bounceStyle = this.props.bounce ? styles.bounce : null;
    const taskCount = this.props.taskStats.get(this.props.type) || 0;
    return (
      <div style={bounceStyle}>
        <Badge
          style={styles.badgeStyle}
          badgeStyle={theme.taskStats}
          badgeContent={taskCount}
          primary={true}
        />
      </div>
    );
  }
}

TaskStats.propTypes = {
  bounce: React.PropTypes.bool,
  type: React.PropTypes.string,
  taskStats: React.PropTypes.object,
  onMount: React.PropTypes.func
};

export default TaskStats;
