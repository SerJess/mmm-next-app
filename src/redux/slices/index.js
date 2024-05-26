import { combineReducers } from "redux";
import { mainSlice } from "./main";

export default combineReducers({
	[mainSlice.name]: mainSlice.reducer,
});
