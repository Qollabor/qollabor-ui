import Immutable from 'immutable';

const defaultState = Immutable.Map(
  {
    menuItemCategory: null,
    isOnInit: false,
    showDrawer: true,
    showCaseUsers: false,
    headerMenu: []
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
      return state.set('showDrawer', !state.get('showDrawer'));

    case 'APP:LEFT_NAV:OPEN':
      return state.set('showDrawer', true);

    case 'APP:LEFT_NAV:CLOSE':
      return state.set('showDrawer', false);

    case 'APP:CASE_USERS:SHOW':
      return state.set('showCaseUsers', action.showCaseUsers);

    case 'APP:HEADER_MENU:SET':
      return state.set('headerMenu', action.headerMenu);

    default :
      return state;
  }
};
