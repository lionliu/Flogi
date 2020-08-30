const express = require('express');
const app = express();

const config = require('./db');
var mongoose = require('mongoose');
const PORT = 4000;


mongoose.connect(config.DB, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(error => {
    console.log(error);
  });


app.get('/', function(req, res) {
    res.json({"hello": "world"});
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});

