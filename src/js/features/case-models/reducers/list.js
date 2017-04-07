import Immutable from 'immutable';

/*
case model list reducer sample =>

{
  isFetching : true | false,
  position:0,
  filterString : ...,
  error: {
    message: '',
    isError: false
  },
  data : [{
           "definitions":"leaverequest.xml",
           "dimensions":"leaverequest.xml",
           "name":"leaverequest"
          }, ...
    ]
  }
}

*/

const defaultState = Immutable.fromJS({
  isFetching: false,
  position: 0,
  filterString: '',
  items: [],
  error: {
    message: '',
    isError: false
  }
});

// Adds the received case models to the existing list.
// TODO : remove if necessary
const getCaseModels = (responseItems) => {
  // Takes the Case Model Item as the Case Data. Take Case Model Name from definition file
  // TODO:Get this fixed in the API?
  const casemodels = responseItems.reduce((arr, caseModel) => {
    const definition = caseModel.definitions;
    return arr.concat({
      ...caseModel,
      name: definition.substr(0, definition.lastIndexOf('.'))
    });
  }, []);

  return Immutable.List(casemodels);
};

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASEMODEL:LIST:FILTER_BY_TEXT':
      return state
        .set('filterString', action.filterString);
    case 'CASEMODEL:LIST:INIT':
      return state
        .set('position', 0);
    case 'CASEMODEL:LIST:REQUEST_INIT':
      return state
        .set('items', Immutable.List());
    case 'CASEMODEL:LIST:FETCH':
      return state
        .set('isFetching', true)
        .set('error', defaultState.get('error'));
    case 'CASEMODEL:LIST:FETCH:SUCCESS':
      return state
        .set('isFetching', false)
        .set('items', getCaseModels(action.items));
    case 'CASEMODEL:LIST:FETCH:FAIL':
      return state
        .set('isFetching', false)
        .set('error', Immutable.Map({
          message: action.error,
          isError: true
        }));
    default:
      return state;
  }
};
