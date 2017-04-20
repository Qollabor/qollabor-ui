import { reducer as formReducer } from 'redux-form';
import appReducer from './app';

import { reducers as user } from '../features/user';
import { reducers as login } from '../features/login';
import { reducers as tasks } from '../features/tasks';
import { reducers as task } from '../features/task';
import { reducers as notifier } from '../features/notifier';
import { reducers as caseReducers } from '../features/case';
import { reducers as caseModelReducers } from '../features/case-models';
import { reducers as schemaForm } from '../components/schema-form/reducers';
import { reducers as userSelector } from '../components/user-selector/reducers';
import { reducers as searchResult } from '../features/search';
import { reducers as caseList } from '../features/case-list';

export default {
  app: appReducer,
  notifier,
  user,
  login,
  tasks,
  task,
  case: caseReducers,
  casemodel: caseModelReducers,
  schemaForm,
  form: formReducer,
  searchResult,
  userSelector,
  caseList
};
