const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const calendarModel = require('./src/models/calendar.js');

app.get('/', async (req, res) => {
  try {
    const calendar = await calendarModel.find();
    res.json(calendar);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/add-event', async (req, res) => {
  calendarModel.create(req.body).then((calendar) => {
    res.json(calendar);
  });
});

// MongoDB connection
mongoose
  .connect(
    'mongodb+srv://admin:1234@cluster0.b8ga8wv.mongodb.net/calendar?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('MongoDB connected');

    // Import routes
    const routes = require('./src/routes');

    // Use routes
    app.use('/api', routes);

    // Start server
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: 'Internal Server Error',
//   });
// });
