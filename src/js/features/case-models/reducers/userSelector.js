import Immutable from 'immutable';

/*
users selector reducer sample =>

{
  filterString : ...,
  isFetching : true | false,
  users : [{
          "uniqueId":"admin",
          "name":"Admin",
          "roles":["Admin"]
          }, ...
    ]
  },
  filterUsers : [{
          "uniqueId":"admin",
          "name":"Admin",
          "roles":["Admin"]
          }, ...
    ]
  }
}

*/

const defaultUsersState = Immutable.fromJS({
  isFetching: false,
  filterString: undefined,
  USERS_SELECTOR: [],
  filterUSERS_SELECTOR: [],
  error: {
    message: '',
    isError: false
  }
});

const getFilteredUsers = (users) => Immutable.List(users);

export const reducers = (state = defaultUsersState, action) => {
  switch (action.type) {
    case 'USERS_SELECTOR:LIST:REQUEST:INIT':
      return state.set('users', Immutable.List());
    case 'USERS_SELECTOR:LIST:FETCH':
      return state.set('isFetching', true);
    case 'USERS_SELECTOR:LIST:FETCH:SUCCESS':
      return state.set('isFetching', false)
                  .set('users', getFilteredUsers(action.items, state.get('filterUsers')));
    case 'USERS_SELECTOR:LIST:FETCH:FAIL':
      return state.set('isFetching', false)
                  .set('error', Immutable.Map({ message: action.error, isError: true }));
    case 'USERS_SELECTOR:LIST:FILTER':
      return state.set('filterString', action.filterString);
    case 'USERS_SELECTOR:LIST:FILTER_USERS':
      return state.set('filterUsers', Immutable.List(action.filterUsers));
    default:
      return state;
  }
};

