import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TaskList from '../components/taskList';
import TaskListHeader from '../components/header';
import TaskListRow from '../components/taskRow';
import LoaderRow from '../components/loaderRow';
import MessageRow from '../components/messageRow';

describe('features/taskList', () => {
  describe('<TaskList />', () => {
    it('should not render if header definition is not passed', () => {
      expect(shallow.bind(<TaskList />))
        .to.Throw();
    });
  });

  describe('<TaskList columns={something} isFetching={false}/>', () => {
    const columns = [
      {
        label: 'Field 1',
        key: 'field1',
        visible: true
      },
      {
        label: 'Field 2',
        key: 'field2',
        visible: true
      }
    ];

    const callback = () => 1;

    let result;
    let header;

    before(() => {
      result = shallow(<TaskList columns={columns} onColumnVisibilityToggle={callback} />);
      header = result.find(TaskListHeader);
    });

    it('should render the header', () => {
      expect(header.length)
        .to.be.equal(1);
    });

    it('should pass the columns object to the header as props', () => {
      expect(header.props())
        .to.be.eql({ columns, onColumnVisibilityToggle: callback });
    });

    it('should not render any loader row', () => {
      expect(result.find(LoaderRow).length)
        .to.be.equal(0);
    });

    it('should render one message row', () => {
      expect(result.find(MessageRow).length)
        .to.be.equal(1);
    });

    it('should pass "No message to show" message as prop to the message row component', () => {
      expect(result.find(MessageRow).prop('message'))
        .to.be.equal('No items to show');
    });
  });

  describe('<TaskList columns={something} isFetching={true} />', () => {
    const columns = [
      {
        label: 'Field 1',
        key: 'field1',
        visible: true
      },
      {
        label: 'Field 2',
        key: 'field2',
        visible: true
      }
    ];

    let result;

    before(() => {
      result = shallow(<TaskList columns={columns} isFetching={true}/>);
    });

    it('should render and show the fetching row component', () => {
      expect(result.find(LoaderRow).length)
        .to.be.equal(1);
    });

    it('should render and not show any task row component', () => {
      expect(result.find(TaskListRow).length)
        .to.be.equal(0);
    });
  });

  describe('<TaskList columns={something} isFetching={false} error={error} />', () => {
    const columns = [
      {
        label: 'Field 1',
        key: 'field1',
        visible: true
      },
      {
        label: 'Field 2',
        key: 'field2',
        visible: true
      }
    ];

    const error = {
      isError: true,
      message: 'test message'
    };

    let result;

    before(() => {
      result = shallow(<TaskList columns={columns} isFetching={false} error={error}/>);
    });

    it('should render and not show any task row component', () => {
      expect(result.find(TaskListRow).length)
        .to.be.equal(0);
    });

    it('should render and not show any loader row component', () => {
      expect(result.find(LoaderRow).length)
        .to.be.equal(0);
    });

    it('should render and show one message row component', () => {
      expect(result.find(MessageRow).length)
        .to.be.equal(1);
    });

    it('should render and the message row component should pass the error message prop', () => {
      expect(result.find(MessageRow).prop('message'))
        .to.be.equal(error.message);
    });
  });
});
