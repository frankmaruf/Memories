import {
  LOGIN,
  LOGOUT,
  SET_TOKEN,
  SET_USER,
  SET_IS_LOGGED_IN,
} from "../constants/actionTypes";

export const authUser = (
  state = { user: {}, tokenId: "", accessToken: "" },
  action
) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.payload.user }));
      localStorage.setItem("tokenId", action?.payload.idToken);
      localStorage.setItem("accessToken", action.payload.accessToken);
      console.log("From reducer" + JSON.parse(localStorage.getItem("user")));
      return {
        ...state,
        user: action.payload.user,
        tokenId: action.payload.idToken,
        accessToken: action.payload.accessToken,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("tokenId");
      localStorage.removeItem("accessToken");
      return {
        ...state,
        user: {},
        tokenId: "",
        accessToken: "",
      };
    default:
      return state;
  }
};
