import { useState } from "react";
import { estimateCalories, formatDuration, getElapsedSeconds } from "../utils/workoutTracking.js";

function Workout({
  sessions,
  activeWorkout,
  weightKg,
  currentTime,
  onWeightChange,
  onStart,
  onUpdateActive,
  onFinish,
}) {
  const [workoutType, setWorkoutType] = useState("Running");
  const elapsedSeconds = getElapsedSeconds(activeWorkout, currentTime);
  const activeCalories = activeWorkout
    ? estimateCalories(activeWorkout.type, elapsedSeconds, activeWorkout.weightKg)
    : 0;
  const totalMinutes = Math.round(sessions.reduce((total, session) => total + session.durationSeconds, 0) / 60);
  const totalCalories = sessions.reduce((total, session) => total + session.calories, 0);

  const startWorkout = (event) => {
    event.preventDefault();
    onStart({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: workoutType,
      elapsedMs: 0,
      startedAt: Date.now(),
      weightKg: Number(weightKg),
    });
  };

  const pauseWorkout = () => {
    const elapsedMs = activeWorkout.elapsedMs + Date.now() - activeWorkout.startedAt;
    onUpdateActive({ ...activeWorkout, elapsedMs, startedAt: null });
  };

  const resumeWorkout = () => {
    onUpdateActive({ ...activeWorkout, startedAt: Date.now() });
  };

  const finishWorkout = () => {
    const durationSeconds = getElapsedSeconds(activeWorkout);
    if (durationSeconds < 1) return;
    onFinish({
      id: activeWorkout.id,
      type: activeWorkout.type,
      durationSeconds,
      calories: estimateCalories(activeWorkout.type, durationSeconds, activeWorkout.weightKg),
      endedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="page">

      <header className="page-heading">
        <div>
          <span className="eyebrow">MOVE WITH PURPOSE</span>
          <h1>🏋️ Workout Tracker</h1>
          <p>Track a live session and watch your estimated calories update as you move.</p>
        </div>
      </header>

      <div className="workout-stats" aria-label="Workout totals">
        <div className="workout-stat"><span>Sessions logged</span><strong>{sessions.length}</strong></div>
        <div className="workout-stat"><span>Total time</span><strong>{totalMinutes} <small>min</small></strong></div>
        <div className="workout-stat"><span>Calories burned</span><strong>{totalCalories + activeCalories} <small>kcal</small></strong></div>
      </div>

      <div className="page-box">
        <div className="section-title-row">
          <div>
            <span className="eyebrow">LIVE SESSION</span>
            <h2>{activeWorkout ? "Workout in progress" : "Start a workout"}</h2>
          </div>
          {activeWorkout && <span className="summary-pill live-pill">LIVE</span>}
        </div>

        {activeWorkout ? (
          <div className="active-workout" aria-live="polite">
            <h3>{activeWorkout.type}</h3>
            <strong className="workout-timer">{formatDuration(elapsedSeconds)}</strong>
            <p>Estimated calories: <strong>{activeCalories} kcal</strong></p>
            <p className="calorie-estimate-note">Estimate uses activity intensity and your {activeWorkout.weightKg} kg body weight.</p>
            <div className="workout-actions">
              {activeWorkout.startedAt ? (
                <button type="button" onClick={pauseWorkout}>Pause</button>
              ) : (
                <button type="button" onClick={resumeWorkout}>Resume</button>
              )}
              <button type="button" className="finish-workout-button" onClick={finishWorkout} disabled={elapsedSeconds < 1}>
                Finish workout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={startWorkout}>
            <label htmlFor="workout-type">Workout type</label>
            <select id="workout-type" value={workoutType} onChange={(event) => setWorkoutType(event.target.value)}>
              <option>Running</option>
              <option>Walking</option>
              <option>Cycling</option>
              <option>Swimming</option>
              <option>Gym</option>
              <option>Yoga</option>
            </select>
            <label htmlFor="body-weight">Your weight (kg)</label>
            <input
              id="body-weight"
              type="number"
              min="1"
              max="500"
              step="0.1"
              value={weightKg}
              onChange={(event) => onWeightChange(Number(event.target.value))}
              required
            />
            <p className="calorie-estimate-note">Calories are estimates based on activity intensity and body weight.</p>
            <button type="submit">Start workout</button>
          </form>
        )}
      </div>

      <div className="page-box">
        <div className="section-title-row">
          <div>
            <span className="eyebrow">YOUR RECENT SESSIONS</span>
            <h2>Workout History</h2>
          </div>
          <span className="summary-pill">{sessions.length} logged</span>
        </div>

        {sessions.length === 0 ? (
          <p>No completed workouts yet. Start a session to see it here.</p>
        ) : sessions.map((session) => (
          <div className="workout-item" key={session.id}>
            <h3>🏃 {session.type}</h3>
            <p>Duration: {formatDuration(session.durationSeconds)}</p>
            <p>Estimated calories: {session.calories} kcal</p>
            <p>{new Date(session.endedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workout;