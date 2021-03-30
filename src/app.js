const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schemas/users')

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.get('/',(req, res)=>{
  res.send('hello world')
})

app.listen('4001', () =>{
  console.log('listening on port 4001')
})