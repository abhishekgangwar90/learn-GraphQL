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
  fields: () =>({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    user: {
      type: new graphql.GraphQLList(UserType),
      resolve: (parentValue, args) =>{
        return axios.get(`http://localHost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'users',
  fields:() =>({
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
          return axios.get(`http://localHost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data)
      }
    }
  })
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
    },
    company:{
      type: CompanyType,
      args: {id: {type: GraphQLString}},
       resolve: (parentType, args) =>{
        return axios.get(`http://localHost:3000/companies/${args.id}`).then(res => res.data);
      }
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery
})