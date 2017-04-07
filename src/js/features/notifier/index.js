import { connect } from 'react-redux';
export { reducers } from './reducers';

import { Notifier as NotifierComponent } from './notifier';

function mapStateToProps(state) {
  return {
    notifications: state.notifier.get('notifications').toArray()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDismiss: key => dispatch({ type: 'NOTIFIER:REMOVE', key })
  };
}

export const Notifier = connect(mapStateToProps, mapDispatchToProps)(NotifierComponent);

export function notifyInfo(message, dismissAfter = 3000) {
  return { type: 'NOTIFIER:NOTIFY', message, level: 'info', dismissAfter };
}
export function notifySuccess(message, dismissAfter = 3000) {
  return { type: 'NOTIFIER:NOTIFY', message, level: 'success', dismissAfter };
}
export function notifyWarning(message, dismissAfter = 3000) {
  return { type: 'NOTIFIER:NOTIFY', message, level: 'warning', dismissAfter };
}
export function notifyDanger(message, dismissAfter = 3000) {
  return { type: 'NOTIFIER:NOTIFY', message, level: 'danger', dismissAfter };
}
