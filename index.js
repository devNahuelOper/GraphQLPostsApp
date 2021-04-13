const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
// const User = require("./models/user");
// const Post = require("./models/post");

const expressGraphQL = require("express-graphql").graphqlHTTP;

const schema = require("./schema/schema");


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

// app.get("/", (req, res) => res.send("Hello Cruel World"));

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const webpackConfig = require("./client/webpack.config.js");

app.use(webpackMiddleware(webpack(webpackConfig)));

app.listen(5000, () => console.log("Server is running on port 5000"));
