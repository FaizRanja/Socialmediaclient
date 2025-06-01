// third-party
import { combineReducers } from 'redux';
// project-imports
import authreducer from './User';
// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({
  authreducer
});

export default reducers;
