import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from './taskReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
