import React from 'react';

const defaultBadgeStyle = {
  width: 'fit-content',
  borderRadius: '15px',
  padding: '3px 10px'

};

const Capsule = ({ children, backgroundColor }) => {
  const display = children ? 'inline' : 'none';
  let badgeStyle = Object.assign({}, defaultBadgeStyle, {
    backgroundColor,
    display
  });
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
  Unassigned: 'gray'
};


const StatusCapsule = ({ status, children }) => {
  let backgroundColor = statusColorMappings[status] || 'blue';
  return (
    <Capsule backgroundColor={backgroundColor} >
      {children}
    </Capsule>);
};

StatusCapsule.propTypes = {
  status: React.PropTypes.string,
  children: React.PropTypes.string
};


export { Capsule, StatusCapsule };
