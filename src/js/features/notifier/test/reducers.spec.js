import { expect } from 'chai';
import Immutable from 'immutable';
import { reducers } from '../reducers';

const defaultState = Immutable.Map({
  current: 0,
  notifications: Immutable.List()
});

describe('features/notifier/reducers', () => {
  describe('When the reducer is colled the first time with no action', () => {
    it('should return the default state', () => {
      expect(reducers(undefined, {}).toJS())
        .to.eql(defaultState.toJS());
    });
  });

  describe('When the action not exist', () => {
    it('should return the same state', () => {
      const state = { a: 1, b: 2 };
      const expected = { a: 1, b: 2 };
      expect(reducers(state, { type: 'SOME:OTHER:ACTION' }))
        .to.eql(expected);
    });
  });

  describe('When a notify is added', () => {
    it('should have a new element in the list and the current should be increased by 1', () => {
      const expected = Immutable.Map({
        current: 1,
        notifications: Immutable.List([
          {
            message: 'some message',
            key: 1,
            level: 'info',
            action: 'X',
            dismissAfter: 3000
          }]
        )
      });

      expect(reducers(defaultState, { type: 'NOTIFIER:NOTIFY', message: 'some message', level: 'info' }).toJS())
        .to.eql(expected.toJS());
    });
  });

  describe('When a notify is added with a dismissAfter specified', () => {
    it('should have a new element with the correct dismissAfter', () => {
      const expected = Immutable.Map({
        current: 1,
        notifications: Immutable.List([
          {
            message: 'some message',
            key: 1,
            level: 'info',
            action: 'X',
            dismissAfter: 5000
          }]
        )
      });

      expect(reducers(defaultState, {
        type: 'NOTIFIER:NOTIFY',
        message: 'some message',
        level: 'info',
        dismissAfter: 5000
      }).toJS())
        .to.eql(expected.toJS());
    });
  });

  describe('When more notifies are added', () => {
    let result;
    before(() => {
      result = reducers(defaultState, {
        type: 'NOTIFIER:NOTIFY',
        message: 'some message 1',
        level: 'info'
      });
      result = reducers(result, {
        type: 'NOTIFIER:NOTIFY',
        message: 'some message 2',
        level: 'danger'
      });
      result = reducers(result, {
        type: 'NOTIFIER:NOTIFY',
        message: 'some message 3',
        level: 'warning'
      });
    });

    it('should have right number of elements', () => {
      expect(result.get('notifications').count()).to.equal(3);
    });

    it('should have right current value', () => {
      expect(result.get('current')).to.equal(3);
    });

    it('should have right values in the list', () => {
      expect(result.getIn(['notifications', 0]).message).to.equal('some message 1');
      expect(result.getIn(['notifications', 1]).message).to.equal('some message 2');
      expect(result.getIn(['notifications', 2]).message).to.equal('some message 3');
      expect(result.getIn(['notifications', 0]).level).to.equal('info');
      expect(result.getIn(['notifications', 1]).level).to.equal('danger');
      expect(result.getIn(['notifications', 2]).level).to.equal('warning');
    });
  });

  describe('When more notifies are removed', () => {
    let result;
    before(() => {
      result = reducers(defaultState, {
        type: 'NOTIFIER:NOTIFY',
        message: 'some message 1',
        level: 'info'
      });
      result = reducers(result, {
        type: 'NOTIFIER:NOTIFY',
        message: 'some message 2',
        level: 'danger'
      });
      result = reducers(result, {
        type: 'NOTIFIER:NOTIFY',
        message: 'some message 3',
        level: 'warning'
      });
      result = reducers(result, {
        type: 'NOTIFIER:REMOVE',
        key: 1
      });
    });

    it('should have right number of elements', () => {
      expect(result.get('notifications').count()).to.equal(2);
    });

    it('should have right current value', () => {
      expect(result.get('current')).to.equal(3);
    });

    it('should have right values in the list', () => {
      expect(result.getIn(['notifications', 0]).message).to.equal('some message 2');
      expect(result.getIn(['notifications', 1]).message).to.equal('some message 3');
      expect(result.getIn(['notifications', 0]).level).to.equal('danger');
      expect(result.getIn(['notifications', 1]).level).to.equal('warning');
    });
  });
});
