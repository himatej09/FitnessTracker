function Dashboard() {

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

  return (
    <div className="page">

      <h1>🏠 Dashboard</h1>

      <p>Welcome to your Fitness Tracker!</p>

      {/* Today's Activity */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>👟 Steps</h2>
          <h3>{steps.toLocaleString()}</h3>
          <p>Goal: {stepGoal.toLocaleString()}</p>

          <div className="mini-progress">
            <div
              className="mini-progress-fill"
              style={{ width: `${stepProgress}%` }}
            ></div>
          </div>

          <p>{stepProgress}% completed</p>
        </div>


        <div className="dashboard-card">
          <h2>🔥 Calories</h2>
          <h3>{calories} kcal</h3>
          <p>Daily Goal: {calorieGoal} kcal</p>
        </div>


        <div className="dashboard-card">
          <h2>💧 Water</h2>
          <h3>{water} L</h3>
          <p>Goal: {waterGoal} L</p>
        </div>


        <div className="dashboard-card">
          <h2>❤️ Heart Rate</h2>
          <h3>{heartRate} BPM</h3>
          <p>Current heart rate</p>
        </div>

      </div>


      {/* Workout Summary */}

      <div className="page-box">

        <h2>🏋️ Workout Summary</h2>

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