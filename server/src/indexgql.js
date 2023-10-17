var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { GraphQLSchema,GraphQLObjectType,GraphQLID,GraphQLString, GraphQLList } = require("graphql")
const connect = require("./db/connect");
const User = require("./models/user")
connect()
//create a type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
      id: { type: GraphQLID},
      phoneNumber: {type: GraphQLString},
      fullName: {type: GraphQLString},
      role: {type: GraphQLString},
  })
});
// create your Query
const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
          return User.find()
      }
    },
    user:{
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
          return User.findById(args.id)
      }
    },
    userByPhoneNumber:{
      type: UserType,
      args: {phoneNumber: {type: GraphQLString}},
      resolve: async(parent, args)=> {
      const data =  await User.findOne({phoneNumber: args.phoneNumber})
        return data
      }
    }
  })
});




//create a mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    deleteUser: {
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
          return User.findByIdAndDelete(args.id)
      }
    },
  })
});


var app = express()
app.use('/graphql', graphqlHTTP({
  schema: new GraphQLSchema({
    query,
    mutation
 }),
  graphiql:true
}));

app.listen(4000)
console.log("Running a GraphQL API server at localhost:4000/graphql")