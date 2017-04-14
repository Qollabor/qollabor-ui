import React from 'react';
import styles from './styles';

export const CustomTitleField = props =>
  (props.title && props.title !== 'undefined') &&
    <legend style={styles.legend}>{props.title}</legend>;
