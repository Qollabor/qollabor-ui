import React, { Component, PropTypes } from 'react';
import styles from './styles';
import { EventItem } from './EventItem';

export class CaseEvents extends Component {

  handleOnClick(item) {
    this.props.raiseEvent(item.caseInstanceId, item.id, item.name);
  }

  render() {
    const availableEvents = this.props.items
      .filter(item => item.currentState === 'Available' && item.type === 'UserEvent');

    return (
      <div>
        <legend style={styles.legend}>
          {this.props.title}
        </legend>

        {availableEvents && availableEvents.length ?
          (availableEvents.map((taskListItem, index) => (
            <EventItem
              key={index}
              onClick={this.handleOnClick.bind(this, taskListItem)}
              name={taskListItem.name}
            />
        ))) :
        (<section style={styles.section}><span style={styles.noTask}>{'No items'}</span></section>)
      }
      </div>
    );
  }
}

CaseEvents.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  raiseEvent: PropTypes.func
};

CaseEvents.defaultProps = {
  items: []
};

export default CaseEvents;
