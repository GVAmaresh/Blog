const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postRouter = require('./routers/PostRouter');
const userRouter = require('./routers/UserRouter');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors());
app.use(cookieParser());


process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});


app.use(express.json());

app.use('/api/v1/post', postRouter);
app.use('/api/v1/user', userRouter);

const dbUrl = 'mongodb+srv://Saitama:2008hebbar@sample.0wvlpxr.mongodb.net/your-database-name'; // Replace 'your-database-name' with your actual database name

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const server = app.listen(5000, () => console.log('Listening on port 5000'));
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});