const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

module.exports = {
  connect() {
    return mongoose.connect(url, {
      useNewUrlParser: true,
    });
  },
  disconnect() {
    return mongoose.disconnect();
  }
};