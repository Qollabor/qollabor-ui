import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { FontIcon } from 'material-ui';
import registry from 'app-registry';

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

export function fetchUserDetails(userIds) {
  const config = registry.get('config');
  const store = registry.get('store');
  // TODO: make tenant variable
  return registry.get('request')
  .get(`${config.baseApiUrl}tenant/world/users/${userIds}`, null, {
    headers: {
      [config.login.token.httpHeader]: store.getState().user.getIn(['loggedUser', 'token'])
    }
  });
}


HelpWidget.propTypes = {
  help: PropTypes.string
};
