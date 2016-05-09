import { combineReducers } from 'redux';

import { reducers as columns } from './columns';
import { reducers as list } from './list';
import { reducers as filters } from './filters';
import { reducers as queryParams } from './queryParams';

export const reducers = combineReducers({
  columns,
  list,
  filters,
  queryParams
});
