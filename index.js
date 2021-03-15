const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const User = require("./models/user");
const schema = require("./schema/schema");

const app = express();
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello Cruel World"));

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => console.log("Server is running on port 5000"));
