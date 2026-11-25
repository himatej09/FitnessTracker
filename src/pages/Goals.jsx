import { useState } from "react";

function Goals() {

  const [stepGoal, setStepGoal] = useState(10000);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [workoutGoal, setWorkoutGoal] = useState(5);
  const [weightGoal, setWeightGoal] = useState(65);

  const currentSteps = 7520;
  const caloriesBurned = 520;
  const workoutsCompleted = 4;
  const currentWeight = 70;

  const stepProgress = Math.min(
    (currentSteps / stepGoal) * 100,
    100
  );

  const calorieProgress = Math.min(
    (caloriesBurned / calorieGoal) * 100,
    100
  );

  const workoutProgress = Math.min(
    (workoutsCompleted / workoutGoal) * 100,
    100
  );

  return (
    <div className="page">

      <header className="page-heading">
        <div>
          <span className="eyebrow">SMALL STEPS, BIG WINS</span>
          <h1>🎯 Fitness Goals</h1>
          <p>Set a target that feels right, then check in on your progress.</p>
        </div>
      </header>

      {/* Set Goals */}

      <div className="page-box">

        <div className="section-title-row">
          <div>
            <span className="eyebrow">PERSONAL TARGETS</span>
            <h2>Set Your Goals</h2>
          </div>
        </div>

        <label>Daily Step Goal</label>

        <input
          type="number"
          value={stepGoal}
          onChange={(e) => setStepGoal(Number(e.target.value))}
        />

        <label>Daily Calorie Goal</label>

        <input
          type="number"
          value={calorieGoal}
          onChange={(e) => setCalorieGoal(Number(e.target.value))}
        />

        <label>Weekly Workout Goal</label>

        <input
          type="number"
          value={workoutGoal}
          onChange={(e) => setWorkoutGoal(Number(e.target.value))}
        />

        <label>Target Weight (kg)</label>

        <input
          type="number"
          value={weightGoal}
          onChange={(e) => setWeightGoal(Number(e.target.value))}
        />

      </div>

      {/* Step Goal */}

      <div className="goal-grid">
      <div className="page-box goal-card">

        <h2>👟 Step Goal</h2>

        <h3>
          {currentSteps} / {stepGoal} steps
        </h3>

        <progress
          value={currentSteps}
          max={stepGoal}
        ></progress>

        <p>{Math.round(stepProgress)}% completed</p>

      </div>

      {/* Calorie Goal */}

      <div className="page-box goal-card">

        <h2>🔥 Calorie Goal</h2>

        <h3>
          {caloriesBurned} / {calorieGoal} kcal
        </h3>

        <progress
          value={caloriesBurned}
          max={calorieGoal}
        ></progress>

        <p>{Math.round(calorieProgress)}% completed</p>

      </div>

      {/* Workout Goal */}

      <div className="page-box goal-card">

        <h2>🏋️ Workout Goal</h2>

        <h3>
          {workoutsCompleted} / {workoutGoal} workouts
        </h3>

        <progress
          value={workoutsCompleted}
          max={workoutGoal}
        ></progress>

        <p>{Math.round(workoutProgress)}% completed</p>

      </div>

      {/* Weight Goal */}

      <div className="page-box goal-card">

        <h2>⚖️ Weight Goal</h2>

        <p>Current Weight: {currentWeight} kg</p>

        <p>Target Weight: {weightGoal} kg</p>

        <p>
          Weight to lose:{" "}
          {Math.max(currentWeight - weightGoal, 0)} kg
        </p>

      </div>
      </div>

    </div>
  );
}

export default Goals;