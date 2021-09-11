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
      return {
        ...state,
        user: action.payload,
        tokenId: action.payload.idToken,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
};
