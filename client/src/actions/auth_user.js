import { LOGIN } from "../constants/actionTypes";

export const signUp = (form, history) => async (dispatch) => {
  try {
    // const response = await fetch("/api/auth/signup", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(form),
    // });
    // const data = await response.json();
    // if (data.error) {
    //     throw data.error;
    // }
    // dispatch({
    //     type: LOGIN,
    //     payload: data,
    // });
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};
export const signIn = (form, history) => async (dispatch) => {
  try {
    history.push("/");
  } catch (err) {
    console.log(err);
  }
};
