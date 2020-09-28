const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require('./models/workoutModel');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', { useNewUrlParser: true });

// html routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, './public/exercise.html'));
});

// blog route loads blog.html
app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, './public/stats.html'));
});

// GET the last workout
app.get('/workouts', (req, res) => {
  db.Workout.find({}).sort({ day: -1 }).limit(1)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET the full range
app.get('/api/workouts/range', (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
