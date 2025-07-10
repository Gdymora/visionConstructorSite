import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import projectReducer from './slices/projectSlice';
import projectsReducer from './slices/projectsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  project: projectReducer,
  projects: projectsReducer,
});

export default rootReducer;
