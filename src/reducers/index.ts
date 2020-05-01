import { combineReducers } from 'redux';
import messages from '../features/messagesSlice';
import auth from '../features/authSlice';
import music from '../features/musicSlice';
import app from '../features/appSlice';

export default combineReducers({
  app,
  auth,
  messages,
  music,
});