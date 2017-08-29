import PropTypes from 'prop-types';
import React from 'react';

const defaultBadgeStyle = {
  width: 'fit-content',
  borderRadius: '15px',
  padding: '3px 10px',
  fontSize: 'none'
};

export const Capsule = ({ children, statusStyle }) => {
  const display = (children || children === 0) ? 'inline' : 'none';
  const capsuleStyle = Object.assign({ display }, statusStyle);
  const badgeStyle = Object.assign({}, defaultBadgeStyle, capsuleStyle);
  return (
    <label style={badgeStyle}>
      {children}
    </label>);
};

Capsule.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundColor: PropTypes.string,
  statusStyle: PropTypes.object
};

Capsule.defaultProps = {
  backgroundColor: 'lightblue'
};

const statusColorMappings = {
  Assigned: 'lightgreen',
  Delegated: '#FFCC44',
  Unassigned: 'gray',
  Completed: '#4caf50',
  Active: '#2196F3',
  Terminated: '#FF5522',
  Suspended: '#ffb74d',
  Failed: '#f44336',
  Closed: '#9e9e9e',
  Available: '#bdbdbd',
  Enabled: '#ab47bc',
  Disabled: '#ce93d8'
};


export const StatusCapsule = ({ status, children, statusStyle }) => {
  const backgroundColor = statusColorMappings[status] || 'blue';
  const style = Object.assign({ backgroundColor }, statusStyle);
  return (
    <Capsule statusStyle={style}>
      {children}
    </Capsule>);
};

StatusCapsule.propTypes = {
  status: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  statusStyle: PropTypes.object
};
