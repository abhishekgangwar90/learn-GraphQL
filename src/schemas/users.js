const graphql  = require('graphql')
const _  = require('lodash');
const Users = require('./../database/user')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = graphql;



const UserType = new GraphQLObjectType({
  name: 'users',
  fields:{
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: UserType,
      args: { id: {type: GraphQLString}},
      resolve: (parentType, args) =>{
        return _.find(Users, {id: args.id})
      }
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery
})