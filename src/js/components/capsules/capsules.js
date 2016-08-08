import React from 'react';

const defaultBadgeStyle = {
  width: 'fit-content',
  borderRadius: '15px',
  padding: '3px 10px',
  fontSize: 'none'
};

const Capsule = ({ children, statusStyle }) => {
  const display = (children || children === 0) ? 'inline' : 'none';
  const capsuleStyle = Object.assign({ display }, statusStyle);
  let badgeStyle = Object.assign({}, defaultBadgeStyle, capsuleStyle);
  return (
    <label style={badgeStyle}>
      {children}
    </label>);
};

Capsule.propTypes = {
  children: React.PropTypes.string,
  backgroundColor: React.PropTypes.string
};

Capsule.defaultProps = {
  backgroundColor: 'lightblue'
};

const statusColorMappings = {
  Assigned: 'lightgreen',
  Delegated: '#FFCC44',
  Unassigned: 'gray',
  Completed: '#bdbdbd',
  Active: '#4caf50',
  Terminated: '#FF5522',
  Suspended: '#ffb74d',
  Failed: '#f44336',
  Closed: '#9e9e9e',
  Available: '#90caf9',
  Enabled: '#ab47bc',
  Disabled: '#ce93d8'
};


const StatusCapsule = ({ status, children, statusStyle }) => {
  const backgroundColor = statusColorMappings[status] || 'blue';
  let style = Object.assign({ backgroundColor }, statusStyle);
  return (
    <Capsule statusStyle={style}>
      {children}
    </Capsule>);
};

StatusCapsule.propTypes = {
  status: React.PropTypes.string,
  children: React.PropTypes.string,
  statusStyle: React.PropTypes.object
};


export { Capsule, StatusCapsule };
