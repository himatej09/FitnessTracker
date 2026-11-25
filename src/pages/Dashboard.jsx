function Dashboard({ displayName }) {

  const steps = 7520;
  const stepGoal = 10000;

  const calories = 520;
  const calorieGoal = 2000;

  const water = 2.1;
  const waterGoal = 3;

  const heartRate = 78;
  const workouts = 4;
  const workoutGoal = 5;

  const stepProgress = Math.round((steps / stepGoal) * 100);
  const workoutProgress = Math.round((workouts / workoutGoal) * 100);
  const calorieProgress = Math.round((calories / calorieGoal) * 100);
  const waterProgress = Math.round((water / waterGoal) * 100);

  return (
    <div className="page">

      <header className="page-heading dashboard-heading">
        <div>
          <span className="eyebrow">YOUR DAILY OVERVIEW</span>
          <h1>Welcome back{displayName ? `, ${displayName}` : ""} 👋</h1>
          <p>A quick look at how you’re moving, fueling, and feeling today.</p>
        </div>
        <span className="today-badge">✨ Keep your momentum</span>
      </header>

      {/* Today's Activity */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2><span aria-hidden="true">👟</span> Steps <span className="metric-tag">TODAY</span></h2>
          <h3>{steps.toLocaleString()}</h3>
          <p>{Math.max(stepGoal - steps, 0).toLocaleString()} steps to your daily goal</p>

          <div className="mini-progress">
            <div
              className="mini-progress-fill"
              style={{ width: `${stepProgress}%` }}
            ></div>
          </div>

          <p>{stepProgress}% completed</p>
        </div>


        <div className="dashboard-card">
          <h2><span aria-hidden="true">🔥</span> Calories <span className="metric-tag">BURNED</span></h2>
          <h3>{calories} kcal</h3>
          <p>Daily Goal: {calorieGoal} kcal</p>
          <div className="mini-progress">
            <div className="mini-progress-fill calorie-fill" style={{ width: `${Math.min(calorieProgress, 100)}%` }}></div>
          </div>
          <p>{calorieProgress}% of daily goal</p>
        </div>


        <div className="dashboard-card">
          <h2><span aria-hidden="true">💧</span> Water <span className="metric-tag">HYDRATION</span></h2>
          <h3>{water} L</h3>
          <p>Goal: {waterGoal} L</p>
          <div className="mini-progress">
            <div className="mini-progress-fill water-fill" style={{ width: `${Math.min(waterProgress, 100)}%` }}></div>
          </div>
          <p>{waterProgress}% of daily goal</p>
        </div>


        <div className="dashboard-card">
          <h2><span aria-hidden="true">❤️</span> Heart Rate <span className="metric-tag">CURRENT</span></h2>
          <h3>{heartRate} BPM</h3>
          <p><span className="status-dot"></span> Current reading</p>
        </div>

      </div>


      {/* Workout Summary */}

      <div className="page-box workout-summary-box">

        <div className="section-title-row">
          <div>
            <span className="eyebrow">WEEKLY ACTIVITY</span>
            <h2>🏋️ Workout Summary</h2>
          </div>
          <span className="summary-pill">{workoutProgress}% complete</span>
        </div>

        <h3>
          {workouts} / {workoutGoal} workouts completed
        </h3>

        <div className="mini-progress">

          <div
            className="mini-progress-fill"
            style={{ width: `${workoutProgress}%` }}
          ></div>

        </div>

        <p>{workoutProgress}% of weekly goal completed</p>

      </div>


      {/* Health Summary */}

      <div className="page-box">

        <h2>📋 Today's Health Summary</h2>

        <p>👟 Steps: {steps.toLocaleString()}</p>

        <p>🔥 Calories Burned: {calories} kcal</p>

        <p>💧 Water Intake: {water} L</p>

        <p>❤️ Heart Rate: {heartRate} BPM</p>

        <p>🏋️ Workouts: {workouts}</p>

      </div>


      {/* Motivation */}

      <div className="page-box motivation">

        <h2>💪 Stay Motivated!</h2>

        <p>
          You are doing great! Keep moving and stay consistent
          with your fitness goals.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;