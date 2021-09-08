import "./App.css";
import React from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./actions/posts";
import Posts from "./Components/Posts/Posts";
import Forms from "./Components/Forms/Forms";
import useStyles from "./styles";
function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getPosts());
    console.log("Dispatched");
  }, [dispatch]);
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography
          className={classes.heading}
          variant="h2"
          align="center"
          color="inherit"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src="./memories.png"
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Forms />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
