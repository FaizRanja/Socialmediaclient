// third-party
import { combineReducers } from 'redux';
// project-imports
import authreducer from './User';
import Userpost from './Userpost'
// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({
  authreducer,
  Userpost,
});

export default reducers;
