const graphql  = require('graphql')
const _  = require('lodash');
const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'companies',
  fields: {
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
})

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
    },
    companyId:{
      type: CompanyType,
      resolve: (parentValue, args) =>{
        console.log(parentValue, args)
          return axios.get(`http://localHost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data)
      }
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
        return axios.get(`http://localHost:3000/users/${args.id}`).then(res => res.data);
      }
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery
})