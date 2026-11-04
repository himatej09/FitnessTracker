import { useState } from "react";

function Workout() {

  const [workoutType, setWorkoutType] = useState("Running");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");

  const [workouts, setWorkouts] = useState([
    {
      type: "Running",
      duration: 30,
      calories: 250
    },
    {
      type: "Cycling",
      duration: 45,
      calories: 400
    }
  ]);

  const addWorkout = (e) => {
    e.preventDefault();

    if (duration === "" || calories === "") {
      alert("Please enter duration and calories");
      return;
    }

    const newWorkout = {
      type: workoutType,
      duration: duration,
      calories: calories
    };

    setWorkouts([...workouts, newWorkout]);

    setDuration("");
    setCalories("");
  };

  return (
    <div className="page">

      <h1>🏋️ Workout Tracker</h1>

      {/* Add Workout */}

      <div className="page-box">

        <h2>Add Workout</h2>

        <form onSubmit={addWorkout}>

          <label>Workout Type</label>

          <select
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
          >
            <option>Running</option>
            <option>Walking</option>
            <option>Cycling</option>
            <option>Swimming</option>
            <option>Gym</option>
            <option>Yoga</option>
          </select>

          <br />
          <br />

          <label>Duration (minutes)</label>

          <input
            type="number"
            placeholder="Example: 30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <br />
          <br />

          <label>Calories Burned</label>

          <input
            type="number"
            placeholder="Example: 250"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />

          <br />
          <br />

          <button type="submit">
            Add Workout
          </button>

        </form>

      </div>

      {/* Workout History */}

      <div className="page-box">

        <h2>Workout History</h2>

        {workouts.map((workout, index) => (

          <div className="workout-item" key={index}>

            <h3>🏃 {workout.type}</h3>

            <p>
              Duration: {workout.duration} minutes
            </p>

            <p>
              Calories: {workout.calories} kcal
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Workout;