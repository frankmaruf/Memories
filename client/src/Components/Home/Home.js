import { Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Posts from "../../Components/Posts/Posts";
import Forms from "../../Components/Forms/Forms";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import useStyles from "./styles";
const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <div>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainGrid}
            container
            justifyContent="space-between"
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid className={classes.marginBottom} item xs={12} sm={4}>
              <Forms currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
