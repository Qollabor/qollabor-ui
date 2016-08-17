import React from 'react';
import { AvFiberManualRecord } from 'material-ui/svg-icons';
import { green500, blue500 } from 'material-ui/styles/colors';


const svgIconStyle = {
  display: 'block',
  margin: 'auto',
  height: '18px',
  width: '18px'
};


export default class ProgressPopover extends React.Component {

  getIconColor(status) {
    return status === 'Completed' ? green500 : blue500;
  }

  render() {
    return <AvFiberManualRecord color={this.getIconColor(this.props.status)} style={svgIconStyle} />;
  }
}
