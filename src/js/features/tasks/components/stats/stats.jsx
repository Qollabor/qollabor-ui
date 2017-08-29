import React from 'react';
import PropTypes from 'prop-types';
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
  bounce: PropTypes.bool,
  type: PropTypes.string,
  taskStats: PropTypes.object,
  onMount: PropTypes.func
};

export default TaskStats;
