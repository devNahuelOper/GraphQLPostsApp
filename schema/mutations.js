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
      },
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString },
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      },
    },
    createPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
      },
      async resolve(_, { title, body }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        console.log(validUser);
        if (validUser.loggedIn) {
          const id = validUser.id;
          console.log(id);
          return new Post({ title, id, body}).save();
        } else {
          throw new Error("Sorry, you need to be logged in to create a post.");
        }
      }
    },
  },
});

module.exports = mutation;
