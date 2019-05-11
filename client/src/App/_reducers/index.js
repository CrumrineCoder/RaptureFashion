import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory

import cart from "./cart.reducer.js";

const home = combineReducers({
	cart
});

export default home;

