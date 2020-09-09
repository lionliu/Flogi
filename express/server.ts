import { dbConfig } from './config/db';
import mongoose  from 'mongoose';
import express = require("express");
const { GraphQLServer } = require('graphql-yoga')
import { log } from './schema/mongoose-log';

const PORT = 4000;
const app = express();

const typeDefs = `
  type Log {
    container_id: String
    container_name: String
    source: String
    log: String
    time: String
  }

  type Query {
    getLogs: [Log]
  }
`;

const resolvers = {
  Query: {
    getLogs: () => log.find(),
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

function connectToDB(): void {
  mongoose.connect(dbConfig.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB Connected');
    server.start( () => console.log('Server is running on localhost:4000'))
  })
  .catch(error => {
    console.log(error);
  });
}

function configExpress(): void {
  app.get("/", (req, res) => {
    res.json({hello: "world"})
  });

  app.get('/collections', (req, res) => {

    mongoose.connection.db.listCollections().toArray((err, collection) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ collections: collection });
      }
    });
      
  });

  app.listen(PORT, () => {
      console.log('Your node js server is running on PORT:', PORT);
  });
}



connectToDB();
// configExpress();
