const mongoose = require('mongoose');

const { Schema } = mongoose;

const WorkoutSchema = new Schema({

  day: {
    type: Date,
    default: Date.now,
  },

  exercises: [
    {
      name: {
        type: String,
        trim: true,
        required: 'Exercise Name is Required',
      },
      type: {
        type: String,
        trim: true,
        required: 'Exercise type is Required',
      },
      weight: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      duration: {
        type: Number,
        required: true,
      },
      distance: {
        type: Number,
      },
    }],
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
