import appReducer from './app';

import { reducers as user } from '../features/user';
import { reducers as login } from '../features/login';
import { reducers as tasks } from '../features/tasks';
import { reducers as task } from '../features/task';
import { reducers as notifier } from '../features/notifier';
import { reducers as caseReducers } from '../features/case';

export default {
  app: appReducer,
  notifier,
  user,
  login,
  tasks,
  task,
  case: caseReducers
};
