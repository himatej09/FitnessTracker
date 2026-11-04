function Progress() {

  const weeklyData = [
    { day: "Monday", steps: 7200, calories: 450, workout: 30 },
    { day: "Tuesday", steps: 8100, calories: 520, workout: 45 },
    { day: "Wednesday", steps: 9000, calories: 600, workout: 60 },
    { day: "Thursday", steps: 7500, calories: 480, workout: 40 },
    { day: "Friday", steps: 8500, calories: 550, workout: 50 },
    { day: "Saturday", steps: 9500, calories: 700, workout: 70 },
    { day: "Sunday", steps: 6800, calories: 400, workout: 25 }
  ];

  const totalSteps = weeklyData.reduce(
    (total, day) => total + day.steps,
    0
  );

  const totalCalories = weeklyData.reduce(
    (total, day) => total + day.calories,
    0
  );

  const totalWorkout = weeklyData.reduce(
    (total, day) => total + day.workout,
    0
  );

  const averageSteps = Math.round(
    totalSteps / weeklyData.length
  );

  return (
    <div className="page">

      <h1>📊 Progress Report</h1>

      <p>Here is your weekly fitness summary.</p>

      {/* Summary */}

      <div className="progress-summary">

        <div className="summary-card">
          <h3>👟 Total Steps</h3>
          <h2>{totalSteps.toLocaleString()}</h2>
        </div>

        <div className="summary-card">
          <h3>🔥 Calories Burned</h3>
          <h2>{totalCalories} kcal</h2>
        </div>

        <div className="summary-card">
          <h3>🏋️ Workout Time</h3>
          <h2>{totalWorkout} min</h2>
        </div>

        <div className="summary-card">
          <h3>📈 Average Steps</h3>
          <h2>{averageSteps.toLocaleString()}</h2>
        </div>

      </div>

      {/* Weekly Steps */}

      <div className="page-box">

        <h2>👟 Weekly Steps</h2>

        {weeklyData.map((day) => (

          <div className="progress-row" key={day.day}>

            <div className="progress-day">
              <span>{day.day}</span>
              <span>{day.steps.toLocaleString()} steps</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(day.steps / 100, 100)}%`
                }}
              ></div>
            </div>

          </div>

        ))}

      </div>

      {/* Weekly Calories */}

      <div className="page-box">

        <h2>🔥 Daily Calories Burned</h2>

        {weeklyData.map((day) => (

          <div className="progress-row" key={day.day}>

            <div className="progress-day">
              <span>{day.day}</span>
              <span>{day.calories} kcal</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(day.calories / 7, 100)}%`
                }}
              ></div>
            </div>

          </div>

        ))}

      </div>

      {/* Workout Summary */}

      <div className="page-box">

        <h2>🏋️ Workout Summary</h2>

        {weeklyData.map((day) => (

          <p key={day.day}>
            <strong>{day.day}:</strong>{" "}
            {day.workout} minutes
          </p>

        ))}

      </div>

    </div>
  );
}

export default Progress;