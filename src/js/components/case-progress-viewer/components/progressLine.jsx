import React from 'react';

const lineStyle = {
  display: 'block',
  borderColor: 'rgb(189, 189, 189)',
  borderTopWidth: '1px',
  borderTopStyle: 'solid'
};

const divStyle = {
  flex: '1 1 auto'
};

export const ProgressLine = () => <div style={divStyle}><span style={lineStyle} /></div>;
