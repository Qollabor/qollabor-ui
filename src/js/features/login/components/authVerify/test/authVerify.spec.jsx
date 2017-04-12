/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AuthVerify from '../authVerify';
import { RefreshIndicator } from 'material-ui';

describe('features/login', () => {
  describe('<AuthVerify />', () => {
    describe('When rendered with default props', () => {
      let result;

      beforeEach(() => {
        result = shallow(<AuthVerify>SOME CONTENT</AuthVerify>);
      });

      it('should have the right amount of text fields', () => {
        expect(result.text())
          .to.be.equal('SOME CONTENT');
      });
    });
    describe('When rendered with isVerifyAuth == true', () => {
      let result;

      beforeEach(() => {
        result = shallow(<AuthVerify isVerifyAuth={true}>SOME CONTENT</AuthVerify>);
      });

      it('should show the progress', () => {
        expect(result.find(RefreshIndicator).length)
          .to.be.equal(1);
      });
      it('should not show the content', () => {
        expect(result.text())
          .to.be.equal('<RefreshIndicator />');
      });
    });
  });
});
