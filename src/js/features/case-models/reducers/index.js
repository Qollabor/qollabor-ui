import { combineReducers } from 'redux';

import { reducers as details } from './details';
import { reducers as list } from './list';

export const reducers = combineReducers({
  details,
  list
});
