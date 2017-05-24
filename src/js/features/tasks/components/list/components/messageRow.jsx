import React from 'react';
import PropTypes from 'prop-types';
import styles from './../styles';

class MessageRow extends React.Component {
  render() {
    const tableRowNoItems = Object.assign({}, styles.tableRow, {
      cursor: 'default',
      borderBottom: '0px'
    });

    return (
      <tr style={tableRowNoItems}>
        <td
          key="novalue"
          colSpan={this.props.colSpan}
          style={Object.assign({}, styles.tableRowColumn, { textAlign: 'center', padding: '15px 0 15px 0' })}
        >
          {this.props.message}
        </td>
      </tr>
    );
  }
}

MessageRow.displayName = 'MessageRow';

MessageRow.propTypes = {
  message: PropTypes.string.isRequired,
  colSpan: PropTypes.number.isRequired
};

export default MessageRow;
