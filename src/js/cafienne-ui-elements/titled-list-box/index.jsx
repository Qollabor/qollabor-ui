import React from 'react';
import PropTypes from 'prop-types';
import { TitledBox } from '../titled-box';
import { LinkRow } from './linkRow';
import { ActionRow } from './actionRow';

import styles from './styles';

export class TitledListBoxComponent extends React.Component {
  render() {
    if (this.props.items && this.props.items.length) {
      return (
        <div>
          {this.props.items.map((taskListItem, index) => (
            taskListItem.url ?
            (<LinkRow key={index} item={taskListItem} labelField={this.props.labelField} />)
              :
            (<ActionRow key={index} item={taskListItem} labelField={this.props.labelField} />)
          )
          )}
        </div>
      );
    }
    return <span style={styles.noTask}>{this.props.emptyListMessage || ''}</span>;
  }
}

TitledListBoxComponent.propTypes = {
  emptyListMessage: PropTypes.string,
  items: PropTypes.array.isRequired,
  labelField: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export const TitledListBox = TitledBox(TitledListBoxComponent);
TitledListBox.displayName = 'TitledListBox';

export default TitledListBox;
