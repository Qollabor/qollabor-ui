import React from 'react';

import { TitledBox } from '../titled-box';
import { LinkRow } from './linkRow';
import { ActionRow } from './actionRow';

import styles from './styles';

export class TitledListBoxComponent extends React.Component {
  render() {
    if (this.props.items && this.props.items.length) {
      return (
        <div>
          {this.props.items.map((taskListItem, index) => {
            if (taskListItem.url) {
              return <LinkRow key={index} item={taskListItem} labelField={this.props.labelField}/>;
            }
            return <ActionRow key={index} item={taskListItem} labelField={this.props.labelField}/>;
          })}
        </div>
      );
    }
    return <span style={styles.noTask}>{this.props.emptyListMessage || ''}</span>;
  }
}

TitledListBoxComponent.propTypes = {
  emptyListMessage: React.PropTypes.string,
  items: React.PropTypes.array.isRequired,
  labelField: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
};

export const TitledListBox = TitledBox(TitledListBoxComponent);
TitledListBox.displayName = 'TitledListBox';

export default TitledListBox;
