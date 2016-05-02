import appReducer from './app';
import { reducers as user } from '../features/user';
import { reducers as login } from '../features/login';

export default {
  app: appReducer,
  user,
  login
};
