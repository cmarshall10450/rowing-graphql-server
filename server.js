import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import cors from 'cors'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import models from './models'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const PORT = 5000
const MONGO_URL = 'mongodb://localhost/rowing'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors('*'))

const graphqlEndpoint = '/graphql'
app.use(
  graphqlEndpoint,
  graphqlExpress({
    schema,
    context: {
      models,
    },
  })
)

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: graphqlEndpoint,
  })
)

mongoose.Promise = Promise
mongoose.connect(MONGO_URL).then(
  () => {
    console.log('Connected to MongoDB')
    console.log('Starting server...')
    app.listen(PORT, () => console.log('Server running on port:', PORT))
  },
  err => {
    console.log(err)
  }
)
