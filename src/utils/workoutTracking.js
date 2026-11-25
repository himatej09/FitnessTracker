const ACTIVITY_MET = {
  Running: 9.8,
  Walking: 3.5,
  Cycling: 7.5,
  Swimming: 8,
  Gym: 5,
  Yoga: 3,
};

export function estimateCalories(type, durationSeconds, weightKg) {
  const met = ACTIVITY_MET[type] || ACTIVITY_MET.Gym;
  return Math.round((met * 3.5 * weightKg * (durationSeconds / 60)) / 200);
}

export function getElapsedSeconds(workout, now = Date.now()) {
  if (!workout) return 0;
  const elapsedMs = workout.elapsedMs + (workout.startedAt ? now - workout.startedAt : 0);
  return Math.max(0, Math.floor(elapsedMs / 1000));
}

export function formatDuration(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
}

export function getWorkoutStorageKey(email) {
  return `fitness_tracker_workouts_${encodeURIComponent(email.toLowerCase())}`;
}

export function parseWorkoutData(serialized) {
  const saved = JSON.parse(serialized);
  if (!saved || !Array.isArray(saved.sessions)) {
    throw new Error('Saved workout data has an unexpected format.');
  }

  return {
    sessions: saved.sessions,
    activeWorkout: saved.activeWorkout || null,
    weightKg: Number.isFinite(saved.weightKg) && saved.weightKg > 0 ? saved.weightKg : 70,
  };
}

export function readWorkoutData(email) {
  const serialized = localStorage.getItem(getWorkoutStorageKey(email));
  return serialized
    ? parseWorkoutData(serialized)
    : { sessions: [], activeWorkout: null, weightKg: 70 };
}
