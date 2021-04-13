const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");

const UserType = require("./user_type");
const PostType = require("./post_type");

const User = require("../models/User");
const Post = require("../models/Post");

const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    register: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, data) {
        return AuthService.register(data);
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
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
