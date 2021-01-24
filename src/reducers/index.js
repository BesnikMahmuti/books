import { combineReducers } from "redux";
import { bookContext } from "./bookContext";
export const allReducers = combineReducers({
    bookContext: bookContext
})