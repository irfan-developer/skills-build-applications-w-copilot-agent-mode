import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const userSeed = [
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        age: 29,
        team: 'Velocity Squad',
        fitnessLevel: 'advanced',
      },
      {
        name: 'Jordan Smith',
        email: 'jordan.smith@example.com',
        age: 32,
        team: 'Velocity Squad',
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        age: 27,
        team: 'Summit Striders',
        fitnessLevel: 'advanced',
      },
      {
        name: 'Lucas Nguyen',
        email: 'lucas.nguyen@example.com',
        age: 35,
        team: 'Summit Striders',
        fitnessLevel: 'beginner',
      },
    ];

    const users = await User.insertMany(userSeed);

    const teamSeed = [
      {
        name: 'Velocity Squad',
        captain: 'Maya Chen',
        members: [users[0]._id, users[1]._id],
        points: 980,
      },
      {
        name: 'Summit Striders',
        captain: 'Priya Patel',
        members: [users[2]._id, users[3]._id],
        points: 940,
      },
    ];

    const teams = await Team.insertMany(teamSeed);

    const activitySeed = [
      {
        userId: users[0]._id,
        type: 'running',
        durationMinutes: 42,
        distanceKm: 7.4,
        caloriesBurned: 510,
        notes: 'Tempo run before work.',
        date: new Date('2026-08-17T06:30:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'strength',
        durationMinutes: 50,
        distanceKm: 0,
        caloriesBurned: 430,
        notes: 'Upper body and core focus.',
        date: new Date('2026-08-18T18:00:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'cycling',
        durationMinutes: 35,
        distanceKm: 18.5,
        caloriesBurned: 460,
        notes: 'Hill repetition ride.',
        date: new Date('2026-08-19T07:15:00Z'),
      },
      {
        userId: users[3]._id,
        type: 'yoga',
        durationMinutes: 28,
        distanceKm: 0,
        caloriesBurned: 180,
        notes: 'Recovery and mobility session.',
        date: new Date('2026-08-20T19:00:00Z'),
      },
      {
        userId: users[0]._id,
        type: 'walking',
        durationMinutes: 30,
        distanceKm: 3.2,
        caloriesBurned: 170,
        notes: 'Evening walk with recovery pace.',
        date: new Date('2026-08-21T20:15:00Z'),
      },
    ];

    await Activity.insertMany(activitySeed);

    const leaderboardSeed = [
      {
        userId: users[0]._id,
        username: 'maya_chen',
        team: teams[0].name,
        points: 520,
        streak: 12,
        weeklyGoal: 5,
      },
      {
        userId: users[1]._id,
        username: 'jordy_runs',
        team: teams[0].name,
        points: 465,
        streak: 9,
        weeklyGoal: 4,
      },
      {
        userId: users[2]._id,
        username: 'priya_p',
        team: teams[1].name,
        points: 490,
        streak: 11,
        weeklyGoal: 5,
      },
      {
        userId: users[3]._id,
        username: 'lucas_lifts',
        team: teams[1].name,
        points: 410,
        streak: 7,
        weeklyGoal: 3,
      },
    ];

    await Leaderboard.insertMany(leaderboardSeed);

    const workoutSeed = [
      {
        name: 'Intervals 5K',
        category: 'cardio',
        durationMinutes: 35,
        difficulty: 'advanced',
        focusArea: 'speed endurance',
        description: 'Short recoveries with fast efforts for aerobic power.',
      },
      {
        name: 'Power Circuit',
        category: 'strength',
        durationMinutes: 40,
        difficulty: 'intermediate',
        focusArea: 'legs and core',
        description: 'Compound lifts with explosive bodyweight work.',
      },
      {
        name: 'Mobility Flow',
        category: 'mobility',
        durationMinutes: 20,
        difficulty: 'beginner',
        focusArea: 'hips and shoulders',
        description: 'Dynamic stretches to improve joint range and recovery.',
      },
      {
        name: 'Recovery Ride',
        category: 'recovery',
        durationMinutes: 30,
        difficulty: 'beginner',
        focusArea: 'active recovery',
        description: 'Low-intensity ride to maintain movement without stress.',
      },
    ];

    await Workout.insertMany(workoutSeed);

    console.log('Database seeding complete');
    console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activitySeed.length} activities, ${leaderboardSeed.length} leaderboard entries, and ${workoutSeed.length} workouts.`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
