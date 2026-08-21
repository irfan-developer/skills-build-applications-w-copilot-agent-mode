import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 1 },
    team: { type: String, default: 'Unassigned' },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    captain: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'walking', 'strength', 'cycling', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    notes: { type: String, default: '' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['cardio', 'strength', 'mobility', 'recovery'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 5 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    focusArea: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    username: { type: String, required: true },
    team: { type: String, default: 'Unassigned' },
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    weeklyGoal: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || model('User', userSchema);
export const Team = mongoose.models.Team || model('Team', teamSchema);
export const Activity = mongoose.models.Activity || model('Activity', activitySchema);
export const Workout = mongoose.models.Workout || model('Workout', workoutSchema);
export const Leaderboard =
  mongoose.models.Leaderboard || model('Leaderboard', leaderboardSchema);
