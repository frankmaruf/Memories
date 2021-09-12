import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles.js";
import { LOGOUT } from "../../constants/actionTypes.js";
const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  // const tokenId = localStorage.getItem("tokenId");

  // const accessToken = localStorage.getItem("accessToken");
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
    localStorage.clear();
    history.push("/");
    setUser(null);
  };
  const [user, setUser] = useState(userInfo);
  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [location]);

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography
            className={classes.heading}
            variant="h2"
            align="center"
            color="inherit"
            component={Link}
            to="/"
          >
            Memories
          </Typography>
          <Link to="/">
            <img
              className={classes.image}
              src="./memories.png"
              alt="memories"
              height="60"
            />
          </Link>
        </div>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.name}
                src={user.imageUrl}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.name}
              </Typography>
              <Button
                onClick={logout}
                variant="contained"
                color="secondary"
                className={classes.logout}
              >
                LogOut
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
