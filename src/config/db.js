const mongoose = require('mongoose');
// const config = require('config');
require('dotenv').config();

const DBconn = async () => {
  try {
    await mongoose.connect(process.env.mongoDBURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
  console.log('connected to mongoDB');
};

module.exports = DBconn;
