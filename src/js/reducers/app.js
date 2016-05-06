import Immutable from 'immutable';
const defaultState = Immutable.Map(
  {
    menuItemCategory: null,
    isOnInit: false,
    showLeftNav: true
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

    case 'APP:LEFT_NAV:TOGGLE':
      return state.set('showLeftNav', !state.get('showLeftNav'));

    case 'APP:LEFT_NAV:OPEN':
      return state.set('showLeftNav', true);

    case 'APP:LEFT_NAV:CLOSE':
      return state.set('showLeftNav', false);

    default :
      return state;
  }
};
