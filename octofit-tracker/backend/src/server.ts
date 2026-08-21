import express, { NextFunction, Request, Response } from 'express';
import db from './config/database.js';
import {
  Activity,
  Leaderboard,
  Team,
  User,
  Workout,
} from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/api/health', (_request: Request, response: Response) => {
  response.json({
    status: 'ok',
    database: db.readyState === 1 ? 'connected' : 'disconnected',
    apiBaseUrl: baseUrl,
  });
});

const handleAsync = (
  handler: (request: Request, response: Response, next: NextFunction) => Promise<void>
) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    await handler(request, response, next);
  } catch (error) {
    next(error);
  }
};

app.get('/api/users', handleAsync(async (_request: Request, response: Response) => {
  const users = await User.find();
  response.json({ apiBaseUrl: baseUrl, count: users.length, results: users });
}));

app.post('/api/users', handleAsync(async (request: Request, response: Response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
}));

app.get('/api/users/:id', handleAsync(async (request: Request, response: Response) => {
  const user = await User.findById(request.params.id);
  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }
  response.json(user);
}));

app.put('/api/users/:id', handleAsync(async (request: Request, response: Response) => {
  const user = await User.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }
  response.json(user);
}));

app.delete('/api/users/:id', handleAsync(async (request: Request, response: Response) => {
  const user = await User.findByIdAndDelete(request.params.id);
  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }
  response.json({ message: 'User deleted', id: request.params.id });
}));

app.get('/api/teams', handleAsync(async (_request: Request, response: Response) => {
  const teams = await Team.find().populate('members');
  response.json({ apiBaseUrl: baseUrl, count: teams.length, results: teams });
}));

app.post('/api/teams', handleAsync(async (request: Request, response: Response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
}));

app.get('/api/teams/:id', handleAsync(async (request: Request, response: Response) => {
  const team = await Team.findById(request.params.id).populate('members');
  if (!team) {
    response.status(404).json({ message: 'Team not found' });
    return;
  }
  response.json(team);
}));

app.put('/api/teams/:id', handleAsync(async (request: Request, response: Response) => {
  const team = await Team.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (!team) {
    response.status(404).json({ message: 'Team not found' });
    return;
  }
  response.json(team);
}));

app.delete('/api/teams/:id', handleAsync(async (request: Request, response: Response) => {
  const team = await Team.findByIdAndDelete(request.params.id);
  if (!team) {
    response.status(404).json({ message: 'Team not found' });
    return;
  }
  response.json({ message: 'Team deleted', id: request.params.id });
}));

app.get('/api/activities', handleAsync(async (_request: Request, response: Response) => {
  const activities = await Activity.find().populate('userId');
  response.json({ apiBaseUrl: baseUrl, count: activities.length, results: activities });
}));

app.post('/api/activities', handleAsync(async (request: Request, response: Response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(activity);
}));

app.get('/api/activities/:id', handleAsync(async (request: Request, response: Response) => {
  const activity = await Activity.findById(request.params.id).populate('userId');
  if (!activity) {
    response.status(404).json({ message: 'Activity not found' });
    return;
  }
  response.json(activity);
}));

app.put('/api/activities/:id', handleAsync(async (request: Request, response: Response) => {
  const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (!activity) {
    response.status(404).json({ message: 'Activity not found' });
    return;
  }
  response.json(activity);
}));

app.delete('/api/activities/:id', handleAsync(async (request: Request, response: Response) => {
  const activity = await Activity.findByIdAndDelete(request.params.id);
  if (!activity) {
    response.status(404).json({ message: 'Activity not found' });
    return;
  }
  response.json({ message: 'Activity deleted', id: request.params.id });
}));

app.get('/api/leaderboard', handleAsync(async (_request: Request, response: Response) => {
  const leaderboard = await Leaderboard.find().sort({ points: -1, streak: -1 });
  response.json({ apiBaseUrl: baseUrl, count: leaderboard.length, results: leaderboard });
}));

app.post('/api/leaderboard', handleAsync(async (request: Request, response: Response) => {
  const entry = await Leaderboard.create(request.body);
  response.status(201).json(entry);
}));

app.get('/api/leaderboard/:id', handleAsync(async (request: Request, response: Response) => {
  const entry = await Leaderboard.findById(request.params.id);
  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' });
    return;
  }
  response.json(entry);
}));

app.put('/api/leaderboard/:id', handleAsync(async (request: Request, response: Response) => {
  const entry = await Leaderboard.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' });
    return;
  }
  response.json(entry);
}));

app.delete('/api/leaderboard/:id', handleAsync(async (request: Request, response: Response) => {
  const entry = await Leaderboard.findByIdAndDelete(request.params.id);
  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' });
    return;
  }
  response.json({ message: 'Leaderboard entry deleted', id: request.params.id });
}));

app.get('/api/workouts', handleAsync(async (_request: Request, response: Response) => {
  const workouts = await Workout.find();
  response.json({ apiBaseUrl: baseUrl, count: workouts.length, results: workouts });
}));

app.post('/api/workouts', handleAsync(async (request: Request, response: Response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json(workout);
}));

app.get('/api/workouts/:id', handleAsync(async (request: Request, response: Response) => {
  const workout = await Workout.findById(request.params.id);
  if (!workout) {
    response.status(404).json({ message: 'Workout not found' });
    return;
  }
  response.json(workout);
}));

app.put('/api/workouts/:id', handleAsync(async (request: Request, response: Response) => {
  const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (!workout) {
    response.status(404).json({ message: 'Workout not found' });
    return;
  }
  response.json(workout);
}));

app.delete('/api/workouts/:id', handleAsync(async (request: Request, response: Response) => {
  const workout = await Workout.findByIdAndDelete(request.params.id);
  if (!workout) {
    response.status(404).json({ message: 'Workout not found' });
    return;
  }
  response.json({ message: 'Workout deleted', id: request.params.id });
}));

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(500).json({ message: 'Internal server error', error: error.message });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});