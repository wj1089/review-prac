import {combineReducers} from "redux";
import user from "./userReducer";
import message from "./message"

export default combineReducers ({
    user,
    message
})
