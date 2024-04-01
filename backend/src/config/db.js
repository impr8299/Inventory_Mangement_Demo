const mongoose = require("mongoose");
const { MONGODB } = require('./constants');

class db {
    static connectDatabase = async () => {
      mongoose
        .connect(MONGODB.URI, {
          useNewUrlParser: true,  
          useUnifiedTopology: true, 
        })
        .then(() => {
          console.log("connected db");
        })
        .catch((err) => {
          console.log(err);
          process.exit(1)
        });
    };
  }
  
  module.exports = db;