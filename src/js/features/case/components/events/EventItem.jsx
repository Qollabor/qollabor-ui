import React, { PropTypes } from 'react';
import styles from './styles';
import { FontIcon } from 'material-ui';

export const EventItem = ({ name, onClick }) => (
  <div
    onClick={onClick}
    style={{ marginBottom: '3px', cursor: 'pointer' }}
  >
    <FontIcon
      className="material-icons"
      style={Object.assign({}, styles.icon)}
    >playlist_add</FontIcon>
    <span style={styles.rowLabel}>
      {name}
    </span>
  </div>
  );

EventItem.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func
};

export default EventItem;
