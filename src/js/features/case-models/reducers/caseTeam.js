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
  roles: Immutable.Map(),
  user: null,
  isSelected: null
});


const getCaseTeam = (roles, selectedRole, selectedUser, selected) => {
  const users = roles.get(selectedRole);
  const index = users.findIndex((item) => item.uniqueId === selectedUser.uniqueId);
  if (!selected) {
    users.splice(index, 1);
  } else if (selected && index === -1) {
    users.push(selectedUser);
  }

  return Immutable.Map(roles.set(selectedRole, users));
};

export const reducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'CASETEAM_SELECTOR:INIT': {
      return state.set('roles', Immutable.Map());
    }
    case 'CASETEAM_SELECTOR:SETROLES': {
      let initRoles = Immutable.Map();
      action.roles.forEach(role => {
        initRoles = initRoles.set(role, []);
      });
      return state.set('roles', initRoles);
    }
    case 'CASETEAM_SELECTOR:SETUSERSFORROLE': {
      return state
        .set('roles', getCaseTeam(state.get('roles'), action.role, action.user, action.selected))
        .set('selectedUser', action.user)
        .set('isSelected', action.selected);
    }
    default:
      return state;
  }
};

