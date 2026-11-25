import { useState } from "react";

function Profile({ email, displayName }) {

  const [name, setName] = useState(displayName || "Fitness User");
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

      <header className="page-heading">
        <div>
          <span className="eyebrow">YOUR FITNESS SPACE</span>
          <h1>👤 My Profile</h1>
          <p>Keep your personal details and fitness focus up to date.</p>
        </div>
      </header>

      {!editing ? (

        <>
          {/* Profile Information */}

          <div className="page-box profile-card">

            <div className="profile-identity">
              <span className="profile-avatar" aria-hidden="true">{name.trim().charAt(0).toUpperCase() || "F"}</span>
              <div>
                <span className="eyebrow">PROFILE DETAILS</span>
                <h2>{name}</h2>
                <p>{email}</p>
              </div>
            </div>

            <div className="profile-details">

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

            </div>

            <button onClick={() => setEditing(true)}>
              Edit Profile
            </button>

          </div>
        </>

      ) : (

        /* Edit Profile */

        <div className="page-box">

          <div className="section-title-row">
            <div>
              <span className="eyebrow">PERSONAL DETAILS</span>
              <h2>Edit Profile</h2>
            </div>
          </div>

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