import React from 'react';

import { TitledBox } from '../titled-box';
import { LinkRow } from './linkRow';
import { ActionRow } from './actionRow';

import styles from './styles';

export class TitledListBox extends React.Component {

  render() {
    let content = false;
    if (this.props.items && this.props.items.length) {
      content = this.props.items.map((item, index) => {
        if (item.url) {
          return <LinkRow key={index} item={item} labelField={this.props.labelField}/>;
        }
        return <ActionRow key={index} item={item} labelField={this.props.labelField}/>;
      });
    } else {
      content = <span style={styles.noTask}>{this.props.emptyListMessage || ''}</span>;
    }

    return (
      <TitledBox
        title={this.props.title}
        isFetching={this.props.isFetching || false}
        error={this.props.error || {}}
      >
        {content}
      </TitledBox>
    );
  }
}

TitledListBox.propTypes = {
  title: React.PropTypes.string.isRequired,
  emptyListMessage: React.PropTypes.string,
  items: React.PropTypes.array.isRequired,
  error: React.PropTypes.object,
  isFetching: React.PropTypes.bool,
  labelField: React.PropTypes.string.isRequired
};

TitledListBox.displayName = 'TitledListBox';

export default TitledListBox;
