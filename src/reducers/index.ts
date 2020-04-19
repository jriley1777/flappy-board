import { combineReducers } from 'redux';
import messages from '../features/messagesSlice';
import auth from '../features/authSlice';
import music from '../features/musicSlice';

export default combineReducers({
  auth,
  messages,
  music,
});