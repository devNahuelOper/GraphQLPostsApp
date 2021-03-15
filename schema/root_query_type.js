const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;
const mongoose = require("mongoose");
const UserType = require("./user_type");
const User = mongoose.model("user");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      },
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        return User.findById(args.id);
      },
    },
  },
});

module.exports = RootQuery;
