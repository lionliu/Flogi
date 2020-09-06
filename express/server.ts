import { dbConfig } from './db';
import { Mongoose } from 'mongoose';
import express = require("express");

const PORT = 4000;
const app = express();
let mongoose: Mongoose;

function connectToDB(): void {
  mongoose.connect(dbConfig.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('MongoDB Connected');
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
configExpress();