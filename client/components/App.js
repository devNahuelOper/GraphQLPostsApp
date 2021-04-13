import React from "react";
import { Route, Switch } from "react-router-dom";
import PostIndex from "./posts/PostIndex";
import CreatePost from "./posts/CreatePost";
import Register from "./Register";

const App = () => (
  <Switch>
    <Route exact path="/" component={Register}/>
    <Route exact path="/posts" component={PostIndex}/>
    <Route path="/posts/new" component={CreatePost}/>
  </Switch>
);

export default App;
