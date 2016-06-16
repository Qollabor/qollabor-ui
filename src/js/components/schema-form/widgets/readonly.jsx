import React from 'react';
import styles from '../styles';

export class ReadOnlyWidget extends React.Component {
  render() {
    let content;
    if (this.props.multiline) {
      const value = this.props.value ? this.props.value.replace('\n', '<br/>') : '';
      content = (
        <div
          name={this.props.name}
          style={styles.readOnly.content}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      );
    } else {
      content = (
        <div
          name={this.props.name}
          style={styles.readOnly.content}
        >{this.props.value}</div>
      );
    }

    return (
      <div
        style={styles.readOnly.container}
      >
        <label
          style={styles.readOnly.label}
        >{this.props.title}</label>
        {content}
      </div>
    );
  }
}
