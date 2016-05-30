import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { FontIcon } from 'material-ui';

import ColumnPicker from '../../../components/column-picker/columnPicker';
import { TaskListHeader } from '../components/header';

describe('features/taskList/header', () => {
  describe('<TaskListHeader />', () => {
    it('should not render if header definition is not passed', () => {
      expect(shallow.bind(<TaskListHeader />))
        .to.Throw();
    });
  });

  describe('<TaskListHeader definition={something} />', () => {
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
    let headers;

    before(() => {
      result = shallow(<TaskListHeader columns={columns}/>);
      headers = result.find('th');
    });

    it('should render and have 4 columns', () => {
      expect(headers.length)
        .to.be.equal(4);
    });

    it('should have an empty first column', () => {
      expect(headers.at(0).find(FontIcon).length)
        .to.be.equal(0);
    });

    it('should have the second column with the header set as "Field 1"', () => {
      expect(headers.at(1).text())
        .to.be.equal('Field 1');
    });

    it('should have the third column with the header set as "Field 2"', () => {
      expect(headers.at(2).text())
        .to.be.equal('Field 2');
    });

    it('should have the fourth column as action', () => {
      expect(headers.at(3).find(ColumnPicker).length)
        .to.be.equal(1);
    });
  });

  describe('<TaskListHeader definition={something with not visibile columns} />', () => {
    const columns = [
      {
        label: 'Field 1',
        key: 'field1',
        visible: false
      },
      {
        label: 'Field 2',
        key: 'field2',
        visible: true
      }
    ];

    let result;
    let headers;

    before(() => {
      result = shallow(<TaskListHeader columns={columns}/>);
      headers = result.find('th');
    });

    it('should render and have 3 columns', () => {
      expect(headers.length)
        .to.be.equal(3);
    });

    it('should have an empty first column', () => {
      expect(headers.at(0).find(FontIcon).length)
        .to.be.equal(0);
    });

    it('should have the second column with the header set as "Field 2"', () => {
      expect(headers.at(1).text())
        .to.be.equal('Field 2');
    });

    it('should have the third column as action', () => {
      expect(headers.at(2).find(ColumnPicker).length)
        .to.be.equal(1);
    });
  });
});
