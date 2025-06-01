// third-party
import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducer';


// project-imports



// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  // auth: authReducer,
  
});



export  default store;
