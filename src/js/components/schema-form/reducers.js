import Immutable from 'immutable';

const defaultState = Immutable.Map({
  status: 'initial',
  formData: {
    title: 'First task',
    done: true,
    birth: '2015-10-10',
    time: '22:55'
  }
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'SCHEMA_FORM:FORM:INIT':
      return state
        .set('status', 'initial')
        .set('formData', action.formData);

    case 'SCHEMA_FORM:FORM:CHANGE':
      return state
        .set('status', 'editing')
        .set('formData', action.formData);


    case 'CASE:ATTACHMENTS:FETCH:FAIL':
      return state
        .set('isFetching', false)
        .set('error', Immutable.Map({
          isError: true,
          message: action.error
        }));

    default:
      return state;
  }
};
