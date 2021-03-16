const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");
const UserType = require("./user_type");
const PostType = require("./post_type");

const User = mongoose.model("user");
const Post = mongoose.model("post");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { name, email, password }) {
        return new User({ name, email, password }).save();
      },
    },
    newPost: {
      type: PostType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        author: {
          type: new GraphQLNonNull(GraphQLString),
          resolve(parentValue) {
            return User.findById(parentValue.author)
              .then((user) => user)
              .catch((err) => null);
          },
        },
      },
      resolve(parentValue, { title, body, author }) {
        return new Post({ title, body, author }).save();
      },
    },
  },
});

module.exports = mutation;
