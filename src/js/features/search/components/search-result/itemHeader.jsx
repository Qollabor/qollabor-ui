import React from 'react';

const headerStyle = {
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#666'
};
const ItemHeader = (props) => <div style={headerStyle}>{props.title}</div>;
ItemHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};
export default ItemHeader;
