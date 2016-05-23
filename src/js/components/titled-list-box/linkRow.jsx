import React from 'react';
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
  item: React.PropTypes.shape({
    url: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    color: React.PropTypes.string
  }),
  labelField: React.PropTypes.string.isRequired
};

LinkRow.displayName = 'LinkRow';

export default LinkRow;
