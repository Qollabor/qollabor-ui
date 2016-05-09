import appReducer from './app';

import { reducers as user } from '../features/user';
import { reducers as login } from '../features/login';
import { reducers as tasks } from '../features/tasks';
import { reducers as task } from '../features/task';

export default {
  app: appReducer,
  user,
  login,
  tasks,
  task
};
