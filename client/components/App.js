import React from "react";
import { Route } from "react-router-dom";
import PostIndex from "./posts/PostIndex";
import Register from "./Register";

const App = () => (
  <Route path="/" component={Register}/>
);

export default App;
