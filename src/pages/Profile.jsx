import { useState } from "react";

function Profile() {

  const [name, setName] = useState("Fitness User");
  const [age, setAge] = useState(21);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [goal, setGoal] = useState("Improve overall fitness");

  const [editing, setEditing] = useState(false);

  const saveProfile = (e) => {
    e.preventDefault();

    setEditing(false);

    alert("Profile saved successfully!");
  };

  return (
    <div className="page">

      <h1>👤 My Profile</h1>

      {!editing ? (

        <>
          {/* Profile Information */}

          <div className="page-box">

            <h2>Personal Information</h2>

            <p>
              <strong>Name:</strong> {name}
            </p>

            <p>
              <strong>Age:</strong> {age} years
            </p>

            <p>
              <strong>Height:</strong> {height} cm
            </p>

            <p>
              <strong>Weight:</strong> {weight} kg
            </p>

            <p>
              <strong>Fitness Goal:</strong> {goal}
            </p>

            <button onClick={() => setEditing(true)}>
              Edit Profile
            </button>

          </div>
        </>

      ) : (

        /* Edit Profile */

        <div className="page-box">

          <h2>Edit Profile</h2>

          <form onSubmit={saveProfile}>

            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Age</label>

            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label>Height (cm)</label>

            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />

            <label>Weight (kg)</label>

            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            <label>Fitness Goal</label>

            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option>Improve overall fitness</option>
              <option>Lose weight</option>
              <option>Gain weight</option>
              <option>Build muscle</option>
              <option>Increase stamina</option>
              <option>Maintain healthy weight</option>
            </select>

            <button type="submit">
              Save Profile
            </button>

          </form>

        </div>

      )}

    </div>
  );
}

export default Profile;