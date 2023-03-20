require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs');

const connectDB = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', jobsRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4002;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
