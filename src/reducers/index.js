import { combineReducers } from "redux";
import { bookContext } from "./bookContext";
import { bookActions } from "./bookActions";
export const allReducers = combineReducers({
    bookContext,
    bookActions
})