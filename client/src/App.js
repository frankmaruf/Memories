import "./App.css";
import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
