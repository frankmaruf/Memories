import { combineReducers } from "redux";
import postReducer from "./posts";
import { authUser } from "./auth_user";
export default combineReducers({
  posts: postReducer,
  authUser,
});
