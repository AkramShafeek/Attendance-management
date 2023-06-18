// config
require('express-async-errors');
require('dotenv').config();
const cors = require('cors');

// express
const express = require('express');
const app = express();

// error handler middleware
const errorHandlerMiddleware = require('./middlewares/errorHandler');

// database connection
const connectToMongo = require('./database/connectToMongo');

// routes
const adminRouter = require('./routes/adminRoutes');

// head middlewares
app.use(cors());
app.use(express.json());

// routes config
app.use('/api/v1/admin/',adminRouter);


app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4001;

const startServer = async () => {
  try {
    await connectToMongo(process.env.MONGO_URI);
    console.log("Connected to database successfully");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log("Couldn't start server due to some error");
    console.log(error);
  }
}

startServer();


