import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TasksFilter from '../component';

describe('features/taskfilter', () => {
  describe('<TasksFilter />', () => {
    const types = [
      {
        id: 'myTasks',
        icon: 'view_list',
        label: 'My Tasks',
        color: '#FFEB3B'
      },
      {
        id: 'dueDate',
        icon: 'query_builder',
        label: 'Due Date',
        color: '#FFEB3B'
      },
      {
        id: 'completed',
        icon: 'check',
        label: 'Completed',
        color: '#004D40'
      },
      {
        id: 'terminated',
        icon: 'clear',
        label: 'Terminated',
        color: '#E53935'
      }
    ];


    const currentTasksFilterLabel = 'My Tasks';
    const currentTasksFilterId = 'myTasks';
    const tasksFilterElement = shallow(
      <TasksFilter
        currentTasksFilter={currentTasksFilterId}
        tasksFilterTypes={types}
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
