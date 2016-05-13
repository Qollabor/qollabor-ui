import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TaskStatus from '../components/taskStatus';
import { FontIcon } from 'material-ui';

describe('features/taskList/taskStatus', () => {
  describe('<TaskStatus />', () => {
    it('should render an empty component', () => {
      const result = shallow(<TaskStatus />);

      expect(result.find(FontIcon).length)
        .to.be.equal(0);
    });
  });

  describe('<TaskStatus status="" />', () => {
    it('should render an empty component', () => {
      const result = shallow(<TaskStatus />);

      expect(result.find(FontIcon).length)
        .to.be.equal(0);
    });
  });

  describe('<TaskStatus status="unexpected" />', () => {
    it('should render an empty component', () => {
      const result = shallow(<TaskStatus />);

      expect(result.find(FontIcon).length)
        .to.be.equal(0);
    });
  });

  describe('<TaskStatus status="DUE" />', () => {
    let result;

    before(() => {
      result = shallow(<TaskStatus status="DUE" />);
    });

    it('should render a <FontIcon>', () => {
      expect(result.find(FontIcon).length)
        .to.be.equal(1);
    });

    it('should render the "history" icon', () => {
      expect(result.find(FontIcon).html())
        .to.contain('history');
    });

    it('should set orange color', () => {
      expect(result.find(FontIcon).prop('style'))
        .to.be.eql({ color: 'orange' });
    });
  });

  describe('<TaskStatus status="COMPLETED" />', () => {
    let result;

    before(() => {
      result = shallow(<TaskStatus status="COMPLETED" />);
    });

    it('should render a <FontIcon>', () => {
      expect(result.find(FontIcon).length)
        .to.be.equal(1);
    });

    it('should render the "done_all" icon', () => {
      expect(result.find(FontIcon).html())
        .to.contain('done_all');
    });

    it('should set green color', () => {
      expect(result.find(FontIcon).prop('style'))
        .to.be.eql({ color: 'green' });
    });
  });

  describe('<TaskStatus status="TERMINATED" />', () => {
    let result;

    before(() => {
      result = shallow(<TaskStatus status="TERMINATED" />);
    });

    it('should render a <FontIcon>', () => {
      expect(result.find(FontIcon).length)
        .to.be.equal(1);
    });

    it('should render the "close" icon', () => {
      expect(result.find(FontIcon).html())
        .to.contain('close');
    });
  });
});
