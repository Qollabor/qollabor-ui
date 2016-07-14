import Immutable from 'immutable';

/*
caseTeam reducer sample =>

{
  roles : [{
    "role":"Admin",
    "users":[{
        "uniqueId":"admin",
        "name":"Admin",
        "roles":["Admin"]
        }, ...
      ]
    }, ...
  ]
}

*/

const defaultState = Immutable.fromJS({
  roles: []
});

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASETEAM_SELECTOR:INIT':
      return state.set('roles', Immutable.List());
    case 'CASETEAM_SELECTOR:SETROLES':
      return state.set('roles', Immutable.List(action.roles));
    case 'CASETEAM_SELECTOR:SETUSERSFORROLE':
      return state.get('roles').get(action.role).set('users', Immutable.List(action.roles));
    default:
      return state;
  }
};

