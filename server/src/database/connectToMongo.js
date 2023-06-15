const mongoose = require('mongoose');

const connectToMongo = (MONGO_URI) => {
    return mongoose.connect(MONGO_URI);
};

module.exports = connectToMongo;