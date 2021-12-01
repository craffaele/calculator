import { combineReducers } from "redux";
import decimalAllowedReducer from "./decimalAllowed";
import inputValueReducer from "./inputValue";
import pressedKeyReducer from "./pressedKey";

const rootReducer = combineReducers({
  decimalAllowed: decimalAllowedReducer,
  inputValue: inputValueReducer,
  pressedKey: pressedKeyReducer
})

export default rootReducer;