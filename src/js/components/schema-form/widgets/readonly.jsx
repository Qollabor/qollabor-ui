import React from 'react';
import styles from '../styles';
import { HelpWidget } from './help';

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

    let help = false;
    if (this.props.help) {
      help = <HelpWidget help={this.props.help} />;
    }

    return (
      <div
        style={styles.readOnly.container}
      >
        <div style={{ zIndex: 100, float: 'right' }}>{help}</div>
        <div
          style={styles.readOnly.label}
        >{this.props.title}</div>
        {content}
      </div>
    );
  }
}
