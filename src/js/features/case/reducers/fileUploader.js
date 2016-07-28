import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  progress: 0,
  file: {},
  items: [],
  error: {
    isError: false,
    message: ''
  }
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {

    case 'FILE_UPLOAD_START': {
      return state
        .set('progress', 0);
    }

    case 'FILE_UPLOAD_PROGRESS': {
      return state
        .set('progress', Math.round(action.payload.progress));
    }

    case 'FILE_UPLOAD_ERROR':
      return state
        .set('error', Immutable.Map({
          isError: true,
          message: action.payload.error
        }));

    case 'FILE_UPLOAD_COMPLETE': {
      return state
        .set('progress', 100)
        .set('file', Immutable.fromJS(action.payload.file))
        .updateIn(['items'], arr => arr.push(action.payload.data));
    }

    default:
      return state;
  }
};
