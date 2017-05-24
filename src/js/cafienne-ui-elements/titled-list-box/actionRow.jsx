import React from 'react';
import PropTypes from 'prop-types';
import { FontIcon } from 'material-ui';

import styles from './styles';

export class ActionRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    if (this.props.item.action) {
      this.props.item.action();
    }
  }

  render() {
    return (
      <div style={{ marginBottom: '3px', cursor: 'pointer' }} onClick={this.handleOnClick}>
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
  item: PropTypes.shape({
    action: PropTypes.func,
    icon: PropTypes.string,
    color: PropTypes.string
  }),
  labelField: PropTypes.string.isRequired
};

ActionRow.displayName = 'ActionRow';

export default ActionRow;
