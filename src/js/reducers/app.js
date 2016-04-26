import Immutable from 'immutable';
const defaultState = Immutable.Map(
  {
    menuItemCategory: null,
    isOnInit: false
  }
);

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'APP:INIT':
      return state.set('isOnInit', true);

    case 'APP:INIT:SUCCESS':
      return state.set('isOnInit', false);

    case 'APP:INIT:FAIL':
      return state.set('isOnInit', false);

    case 'APP:CHANGE_MENU_ITEM_CATEGORY':
      return state.set('menuItemCategory', action.menuItemCategory);

    default :
      return state;
  }
};
