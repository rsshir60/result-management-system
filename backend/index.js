const express = require('express');
const setupMorgan = require('./src/config/morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const connectToMongoDB = require('./src/config/mongoDB')
const  routes = require('./src/routes/route');
const  adminRoute = require('./src/routes/adminRoute');
const  studentsRoute = require('./src/routes/studentsRoute');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
const [responseTimeMiddleware, consoleLogger, fileLogger] = setupMorgan();
app.use(responseTimeMiddleware);
app.use(consoleLogger);
app.use(fileLogger);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



connectToMongoDB();


app.use('/api/open', routes);
app.use('/api/student', studentsRoute);
app.use('/api/admin', adminRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
