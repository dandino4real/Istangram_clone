const express = require("express");
const mongoose = require("mongoose");
const {MONGODB_URL, PORT} = require('./config');
require('./models/user');



//initiallizing express
const app = express();



mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL)
  .then(() => { console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  
