const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const User = require("./models/user");
const Post = require("./models/post");
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

const router = express.Router();

app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// const createNewPost = router.post("/new", (req, res) => {
//   const newPost = new Post({
//     title: req.body.title,
//     body: req.body.body,
//     date: req.body.date,
//     author: req.body.author,
//   });

//   newPost
//     .save()
//     .then((savedPost) => res.json(savedPost))
//     .catch((err) => console.log(err));
// });

// app.use("/posts", createNewPost);

app.listen(5000, () => console.log("Server is running on port 5000"));
