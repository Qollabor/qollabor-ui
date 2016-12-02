import React from 'react';
import { FontIcon } from 'material-ui';

import styles from './styles';

export class ActionRow extends React.Component {
  handleOnClick() {
    if (this.props.item.action) {
      this.props.item.action();
    }
  }

  render() {
    return (
      <div style={{ marginBottom: '3px', cursor: 'pointer' }} onClick={this.handleOnClick.bind(this)}>
        <FontIcon
          className="material-icons"
          style={Object.assign({}, styles.icon, { color: this.props.item.color })}
        >{this.props.item.icon}</FontIcon>
        <span style={styles.rowLabel}>
          {this.props.item[this.props.labelField]}
        </span>
      </div>
    );
  }
}

ActionRow.propTypes = {
  item: React.PropTypes.shape({
    action: React.PropTypes.func,
    icon: React.PropTypes.string,
    color: React.PropTypes.string
  }),
  labelField: React.PropTypes.string.isRequired
};

ActionRow.displayName = 'ActionRow';

export default ActionRow;
