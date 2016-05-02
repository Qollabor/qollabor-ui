import appReducer from './app';

import { reducers as user } from '../features/user';
import { reducers as login } from '../features/login';
import { reducers as taskList } from '../features/task-list';
import { reducers as tasksFilter } from '../features/tasks-filter';

export default {
  app: appReducer,
  user,
  login,
  taskList,
  tasksFilter
};
