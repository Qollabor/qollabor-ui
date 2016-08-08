import React from 'react';
import { Popover, PopoverAnimationVertical } from 'material-ui';
import PlanItem from './planItem';
import ProgressIcon from './progressIcon';

const labelStyle = {
  position: 'absolute',
  fontSize: 'x-small',
  fontWeight: 'bold',
  width: '100px',
  color: 'rgb(99, 89, 89)'
};

const cursorStyle = {
  cursor: 'pointer'
};

export default class ProgressItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {
    const { status, name, items } = this.props;
    let planItems = items.map(item =>
      <PlanItem item={item} />);
    return (
      <div data-status={status}>
        <div onTouchTap={this.handleTouchTap.bind(this)} style={cursorStyle}>
          <ProgressIcon status={status} />
          <label style={labelStyle}>{name}</label>
        </div>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose.bind(this)}
          animation={PopoverAnimationVertical}
        >
          <div style={{ width: '100%', height: '100%' }}>
            {planItems}
          </div>
        </Popover>
      </div>
    );
  }
}
