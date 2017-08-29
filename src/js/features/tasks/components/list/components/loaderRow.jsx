import React from 'react';
import PropTypes from 'prop-types';
import { RefreshIndicator } from 'material-ui';

import styles from './../styles';

class LoaderRow extends React.Component {
  render() {
    const tableRowNoItems = Object.assign({}, styles.tableRow, {
      cursor: 'default',
      borderBottom: '0px'
    });

    const divStyle = { position: 'relative', height: '50px', width: '50px', margin: '0px auto' };

    return (
      <tr style={tableRowNoItems}>
        <td
          key="noitems"
          colSpan={this.props.colSpan}
          style={Object.assign({}, styles.tableRowColumn, { textAlign: 'center', padding: '15px 0 15px 0' })}
        >
          <div style={divStyle}>
            <RefreshIndicator
              size={30}
              left={5}
              top={5}
              status="loading"
            />
          </div>
        </td>
      </tr>
    );
  }
}

LoaderRow.displayName = 'LoaderRow';

LoaderRow.propTypes = {
  colSpan: PropTypes.number.isRequired
};

export default LoaderRow;
