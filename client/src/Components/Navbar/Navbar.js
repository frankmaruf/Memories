import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";
import useStyles from "./styles.js";
const Navbar = () => {
  const classes = useStyles();
  const user = null;
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
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
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
