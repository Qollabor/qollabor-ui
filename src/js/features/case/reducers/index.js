import { combineReducers } from 'redux';

import { reducers as attachments } from './attachments';
import { reducers as caseReducer } from './case';
import { reducers as completedTasks } from './completedTasks';
import { reducers as activeTasks } from './activeTasks';

export const reducers = combineReducers({
  case: caseReducer,
  attachments,
  completedTasks,
  activeTasks
});
