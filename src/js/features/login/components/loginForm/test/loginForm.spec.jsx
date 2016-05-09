/* eslint-disable no-unused-expressions */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LoginForm from '../loginForm.jsx';
import sinon from 'sinon';
import { TextField, RaisedButton, RefreshIndicator } from 'material-ui';

describe('features/login', () => {
  describe('<LoginForm />', () => {
    const loginCallback = {
      onLogin: (username, password) => {
        console.log('Log in: ', username, password);
      },
      onCancel: () => {
        console.log('Cancel');
      }
    };

    describe('When redered with default props', () => {
      let result;

      before(() => {
        result = shallow(<LoginForm {...loginCallback} />);
      });

      it('should have the right amount of text fields', () => {
        expect(result.find(TextField).length)
          .to.be.equal(2);
      });
      it('should have the right amount of buttons', () => {
        expect(result.find(RaisedButton).length)
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

      before(() => {
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
      before(() => {
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

    describe('When click on buttons', () => {
      let result;
      let onLogin;
      let onCancel;
      before(() => {
        onLogin = sinon.spy();
        onCancel = sinon.spy();

        result = shallow(
          <LoginForm
            onLogin={onLogin}
            onCancel={onCancel}
          />
        );
      });
      it('the cancel callback should be clicked', () => {
        const buttons = result.find(RaisedButton);
        buttons.at(0).simulate('click');
        expect(onCancel.calledOnce).to.equal(true);
      });
      it.skip('the login callback should be clicked', () => {
        // FIXME Change the rendering using mount instead of shallow
        const buttons = result.find('form');
        buttons.at(1).simulate('submit');
        expect(onLogin.calledOnce).to.equal(true);
      });
    });
  });
});
