require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//Security Packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const authRoute = require('./routes/auth');
const jobsRoute = require('./routes/jobs');

const authenticateUser = require('./middleware/authentication');

const connectDB = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100 //Limit each IP address to a maximum of 100 per windowMs
}));
app.use(express.json());
// security packages initialization
app.use(helmet());
app.use(cors());
app.use(xss());


// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/jobs', authenticateUser, jobsRoute);
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
