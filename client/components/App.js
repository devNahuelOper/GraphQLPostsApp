import React from "react";
import { Route, Switch } from "react-router-dom";
import PostIndex from "./posts/PostIndex";
import CreatePost from "./posts/CreatePost";
import Register from "./Register";
import Navigation from "./navigation/Navigation";

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route path="/new" component={CreatePost} />
      <Route path="/register" component={Register} />
      <Route path="/" component={PostIndex} />
    </Switch>
  </div>
);

export default App;
