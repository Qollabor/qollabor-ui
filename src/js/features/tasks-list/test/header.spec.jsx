import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { IconButton, FontIcon } from 'material-ui';
import { TaskListHeader } from '../components/header';

describe('features/header', () => {
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
        key: 'field1'
      },
      {
        label: 'Field 2',
        key: 'field2'
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
      expect(headers.at(3).find(IconButton).length)
        .to.be.equal(1);
    });
  });
});
