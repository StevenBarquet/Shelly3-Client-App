import { combineReducers } from 'redux';
import appInfoReducer from 'Reducers/appInfo';
import homeReducer from 'Reducers/home';

export default combineReducers({
  appInfoReducer,
  homeReducer
});
