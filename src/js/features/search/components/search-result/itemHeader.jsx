import React from 'react';
import PropTypes from 'prop-types';

const headerStyle = {
  fontSize: '15px',
  fontWeight: 'bold',
  color: '#666'
};
const ItemHeader = props => <div style={headerStyle}>{props.title}</div>;
ItemHeader.propTypes = {
  title: PropTypes.string.isRequired
};
export default ItemHeader;
