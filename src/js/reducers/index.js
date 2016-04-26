import appReducer from './app';
import { reducer as user } from '../features/user';

export default {
  app: appReducer,
  user
};
