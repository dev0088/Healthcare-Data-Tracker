import { combineReducers } from 'redux';
import app from './appReducer';
import auth from './loginReducer';
import signup from './signupReducer';

export default combineReducers({
  app,
  auth,
  signup
});
