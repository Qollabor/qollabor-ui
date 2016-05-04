import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TasksFilter from '../component';
import { defaultState as tasksFilterTypes } from '../reducers';

describe('features/taskfilter', () => {
  describe('<TasksFilter />', () => {
    const currentTasksFilterLabel = 'My Tasks';
    const currentTasksFilterId = 'myTasks';
    const tasksFilterElement = shallow(
      <TasksFilter
        currentTasksFilter={currentTasksFilterId}
        tasksFilterTypes={tasksFilterTypes.get('tasksFilterTypes')}
      />
    );
    const foundTasksFilterElements = tasksFilterElement.find('MenuItem');

    describe('When entering the component', () => {
      it('should have the exact number of elements', () => {
        expect(foundTasksFilterElements.nodes.length).to.equal(4);
      });

      it('should have default taskfilter selected', () => {
        foundTasksFilterElements.nodes.map((tasksFilterNode) => {
          if (tasksFilterNode.props.label === currentTasksFilterLabel) {
            expect(tasksFilterNode.props.style.backgroundColor).to.equal('#ECEFF1');
          }
          return null;
        });
      });
    });
  });
});
