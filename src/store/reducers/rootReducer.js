import { combineReducers } from 'redux';
import counterReducer from './counter.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  counter: counterReducer,
});

export default rootReducer;
