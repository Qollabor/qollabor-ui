import React from 'react';
import PropTypes from 'prop-types';
import { FontIcon } from 'material-ui';

import styles from './styles';

export class LinkRow extends React.Component {
  render() {
    return (
      <div style={{ marginBottom: '3px' }}>
        <a href={this.props.item.url} style={styles.link}>
          <FontIcon
            className="material-icons"
            style={Object.assign({}, styles.icon, { color: this.props.item.color })}
          >{this.props.item.icon}</FontIcon>
          <span style={styles.rowLabel}>
            {this.props.item[this.props.labelField]}
          </span>
        </a>
      </div>
    );
  }
}

LinkRow.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string.isRequired,
    icon: PropTypes.string,
    color: PropTypes.string
  }),
  labelField: PropTypes.string.isRequired
};

LinkRow.displayName = 'LinkRow';

export default LinkRow;
