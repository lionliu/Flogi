import { dbConfig } from './config/db';
import mongoose  from 'mongoose';
import express = require("express");
const { GraphQLServer } = require('graphql-yoga')
import { log } from './schema/mongoose-log';
import _ from 'lodash';

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
    server.start({ port: 5000 } , () => console.log('Server is running on localhost:4000'))
  })
  .catch(error => {
    console.log(error);
  });
}

function configExpress(): void {
  // app.get("/", (req, res) => {
  //   res.json({hello: "world"})
  // });

  app.get('/collections', (req, res) => {

    mongoose.connection.db.listCollections().toArray((err, collection) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ collections: collection });
      }
    });
  });

   app.get("/logs", (req, res) => {
      // let container_name = req.query.container_name

      let query: { [index: string]: any } = {
        container_id: req.query.container_id || "",
        container_name: req.query.container_name || "",
        source: req.query.source || "",
      };

      Object.keys(query).forEach(
        (key) => query[key] === "" && delete query[key]
      );

      console.log(query)
     log
       .find(query)
       .then((data: Object) => {
         res.json(data);
       })
       .catch(() => {
         res.status(400).json({ msg: "Log not found" });
       });
   });

  //  app.get("/logs/:container_name", (req, res) => {
  //    console.log(req.params);
  //    log
  //      .findOne({
  //        container_name: req.params.container_name,
  //      })
  //      .then((data: Object) => {
  //        res.json(data);
  //      })
  //      .catch(() => {
  //        res.status(400).json({ msg: "Log not found" });
  //      });
  //  });

  app.listen(PORT, () => {
      console.log('Your node js server is running on PORT:', PORT);
  });
}



connectToDB();
configExpress();
