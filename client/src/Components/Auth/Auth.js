import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutLineIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import Icon from "./icon";
import Input from "./Input";
import useStyles from "./styles.js";
import { LOGIN } from "../../constants/actionTypes";
import { signIn, signUp } from "../../actions/auth_user";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
var myEnv = dotenv.config();
dotenvExpand(myEnv);

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [form, setForm] = React.useState(initialState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignUp(!isSignUp);
    handleShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (isSignUp) {
      dispatch(signUp(form, history));
      history.push("/");
    }

    if (!isSignUp) {
      dispatch(signIn(form, history));
    }
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenObj;
    const accessToken = token?.access_token;
    const idToken = token?.id_token;
    const user = {
      firstName: result?.givenName,
      lastName: result?.familyName,
      email: result?.email,
      imageUrl: result?.imageUrl,
      name: result?.name,
    };
    try {
      await dispatch({ type: LOGIN, payload: { user, accessToken, idToken } });
      // await dispatch({ type: "SET_TOKEN", payload: accessToken });
      // await dispatch({ type: "SET_USER", payload: user });
      // await dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later");
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutLineIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  ></Input>

                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  ></Input>
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Sign in with Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Aleady have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
