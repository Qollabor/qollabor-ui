import React from 'react';
import ReactTooltip from 'react-tooltip';
import { FontIcon } from 'material-ui';

let prog = 0;
export class HelpWidget extends React.Component {
  render() {
    const current = prog++;
    return (
      <a style={{ cursor: 'help' }} data-tip={true} data-for={`react-form-tooltip${current}`}>
        <ReactTooltip id={`react-form-tooltip${current}`} place="left" type="dark" effect="float">
          <span>{this.props.help}</span>
        </ReactTooltip>
        <FontIcon
          color="#005b81"
          className="material-icons"
          style={{ width: '10px', height: '10px', fontSize: '20px' }}
        >help</FontIcon>
      </a>
    );
  }
}
