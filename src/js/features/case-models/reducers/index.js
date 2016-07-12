import { combineReducers } from 'redux';

import { reducers as details } from './details';
import { reducers as list } from './list';
import { reducers as caseTeam } from './caseTeam';
import { reducers as userSelector } from './userSelector';

export const reducers = combineReducers({
  details,
  list,
  caseTeam,
  userSelector
});
