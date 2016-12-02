/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LoginForm from '../loginForm.jsx';
import { TextField, RaisedButton, FlatButton, RefreshIndicator } from 'material-ui';

describe('features/login', () => {
  describe('<LoginForm />', () => {
    const loginCallback = {
      onLogin: () => {},
      onCancel: () => {}
    };

    describe('When rendered with default props', () => {
      let result;

      beforeEach(() => {
        result = shallow(<LoginForm {...loginCallback} />);
      });

      it('should have the right amount of text fields', () => {
        expect(result.find(TextField).length)
          .to.be.equal(2);
      });
      it('should have the right buttons', () => {
        expect(result.find(RaisedButton).length + result.find(FlatButton).length)
          .to.be.equal(2);
      });
      it('should have the text and the buttons enabled', () => {
        result.find(RaisedButton).forEach(button => {
          expect(button.prop('disabled'))
            .to.be.false;
        });
        result.find(TextField).forEach(button => {
          expect(button.prop('disabled'))
            .to.be.false;
        });
      });
      it('should have the text field without errors', () => {
        result.find(TextField).forEach(button => {
          expect(button.prop('errorText'))
            .to.be.undefined;
        });
      });

      it('should not have the RefreshIndicator', () => {
        expect(result.find(RefreshIndicator).length)
          .to.be.equal(0);
      });
    });

    describe('When redered with default props', () => {
      let result;

      beforeEach(() => {
        result = shallow(<LoginForm {...loginCallback} isLoggingIn={true} />);
      });
      it('should have the text and the buttons disabled', () => {
        result.find(RaisedButton).forEach(button => {
          expect(button.prop('disabled'))
            .to.be.true;
        });
        result.find(TextField).forEach(button => {
          expect(button.prop('disabled'))
            .to.be.true;
        });
      });
      it('should not have the RefreshIndicator', () => {
        expect(result.find(RefreshIndicator).length)
          .to.be.equal(1);
      });
    });

    describe('When rendered with errors', () => {
      let result;
      beforeEach(() => {
        result = shallow(
          <LoginForm
            {...loginCallback}
            errors={{
              username: 'Some username error',
              password: 'Some password error'
            }}
          />
        );
      });
      it('should have the text and the buttons disabled', () => {
        const textFields = result.find(TextField);
        expect(textFields.at(0).prop('errorText'))
          .to.be.equal('Some username error');
        expect(textFields.at(1).prop('errorText'))
          .to.be.equal('Some password error');
      });
      it('should not have the RefreshIndicator', () => {
        expect(result.find(RefreshIndicator).length)
          .to.be.equal(0);
      });
    });
  });
});
