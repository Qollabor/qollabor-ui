import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default class ProgressBar extends React.Component {

  render() {
    return (<LinearProgress
      style={{ marginTop: '10px', width: '200px' }}
      mode="determinate"
      value={this.props.progress}
    />);
  }
}

ProgressBar.propTypes = {
  progress: React.PropTypes.number
};
