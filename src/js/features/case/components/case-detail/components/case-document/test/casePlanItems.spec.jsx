import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'material-ui';
import CasePlanItems from '../casePlanItems';

describe('features/case/case-detail/casePlanItems', () => {
  describe('<CasePlanItems />', () => {
    it('should not render if items props are not passed', () => {
      expect(shallow.bind(<CasePlanItems />))
        .toThrow();
    });
  });

  describe('when has items prop', () => {
    const casePlanItemsComponent = shallow(
      <CasePlanItems
        items={[]}
      />);

    it('should set prop initiallyExpanded of <Card /> to true', () => {
      expect(casePlanItemsComponent.find(Card).prop('initiallyExpanded')).toEqual(true);
    });
  });
});
