import React from 'react';

import styles from './styles';

export class JsonPrinter extends React.Component {
  render() {
    const json = JSON.stringify(this.props.object, 0, 2);

    const prep = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const content = prep
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = 'number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key';
            } else {
              cls = 'string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean';
          } else if (/null/.test(match)) {
            cls = 'null';
          }
          return `<span style=${JSON.stringify(styles[cls])}>${match}</span>`;
        });

    return (
      <pre style={styles.pre} dangerouslySetInnerHTML={{ __html: content }} />
    );
  }
}

JsonPrinter.propTypes = {
  object: React.PropTypes.object.isRequired
};

export default JsonPrinter;
