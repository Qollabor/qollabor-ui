import React from 'react';

import styles from './styles';

export class FieldTitle extends React.Component {
  render() {
    const { idSchema, title } = this.props;
    if (!title) {
      return null;
    }
    return (
      <div
        id={`${idSchema.id}__title`}
        style={styles.titleContainer}
      >
        <legend style={styles.title}>{title}</legend>
      </div>
    );
  }
}

FieldTitle.propTypes = {
  idSchema: React.PropTypes.object,
  title: React.PropTypes.string
};
