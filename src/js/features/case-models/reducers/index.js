import { combineReducers } from 'redux';

import { reducers as details } from './details';
import { reducers as list } from './list';
import { reducers as caseTeam } from './caseTeam';

export const reducers = combineReducers({
  details,
  list,
  caseTeam
});
