import { useState } from "react";

function Diet() {

  const [foodName, setFoodName] = useState("");
  const [meal, setMeal] = useState("Breakfast");
  const [calories, setCalories] = useState("");

  const [foods, setFoods] = useState([
    {
      name: "Oatmeal",
      meal: "Breakfast",
      calories: 300
    },
    {
      name: "Chicken Rice",
      meal: "Lunch",
      calories: 500
    }
  ]);

  const addFood = (e) => {
    e.preventDefault();

    if (foodName === "" || calories === "") {
      alert("Please enter food name and calories");
      return;
    }

    const newFood = {
      name: foodName,
      meal: meal,
      calories: Number(calories)
    };

    setFoods([...foods, newFood]);

    setFoodName("");
    setCalories("");
  };

  const totalCalories = foods.reduce(
    (total, food) => total + Number(food.calories),
    0
  );
  const calorieTarget = 2000;
  const calorieProgress = Math.min(Math.round((totalCalories / calorieTarget) * 100), 100);

  return (
    <div className="page">

      <header className="page-heading">
        <div>
          <span className="eyebrow">FUEL YOUR DAY</span>
          <h1>🍎 Diet & Calorie Tracker</h1>
          <p>Keep a simple record of your meals and daily energy intake.</p>
        </div>
      </header>

      {/* Add Food */}

      <div className="page-box">

        <div className="section-title-row">
          <div>
            <span className="eyebrow">MEAL JOURNAL</span>
            <h2>Add Food</h2>
          </div>
        </div>

        <form onSubmit={addFood}>

          <label>Food Name</label>

          <input
            type="text"
            placeholder="Example: Chicken Rice"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />

          <label>Meal</label>

          <select
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Snacks</option>
            <option>Dinner</option>
          </select>

          <label>Calories</label>

          <input
            type="number"
            placeholder="Example: 500"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />

          <button type="submit">
            Add Food
          </button>

        </form>

      </div>

      {/* Daily Calories */}

      <div className="page-box">

        <div className="section-title-row">
          <div>
            <span className="eyebrow">DAILY INTAKE</span>
            <h2>🔥 Today's Calories</h2>
          </div>
          <span className="summary-pill">{calorieProgress}% of target</span>
        </div>

        <h3>{totalCalories} kcal</h3>

        <p>Daily Target: {calorieTarget} kcal</p>
        <div className="mini-progress calorie-track" role="progressbar" aria-label="Daily calorie target" aria-valuenow={Math.min(totalCalories, calorieTarget)} aria-valuemin="0" aria-valuemax={calorieTarget}>
          <div className="mini-progress-fill calorie-fill" style={{ width: `${calorieProgress}%` }}></div>
        </div>
        <p>{Math.max(calorieTarget - totalCalories, 0)} kcal to target</p>

      </div>

      {/* Food History */}

      <div className="page-box">

        <div className="section-title-row">
          <div>
            <span className="eyebrow">TODAY'S MEALS</span>
            <h2>🍽️ Food History</h2>
          </div>
          <span className="summary-pill">{foods.length} items</span>
        </div>

        {foods.map((food, index) => (

          <div className="food-item" key={index}>

            <h3>🍴 {food.name}</h3>

            <p><span className="meal-label">{food.meal}</span></p>

            <p>Calories: {food.calories} kcal</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Diet;