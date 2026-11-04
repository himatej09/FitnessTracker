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

  return (
    <div className="page">

      <h1>🍎 Diet & Calorie Tracker</h1>

      {/* Add Food */}

      <div className="page-box">

        <h2>Add Food</h2>

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

        <h2>🔥 Today's Calories</h2>

        <h3>{totalCalories} kcal</h3>

        <p>Daily Target: 2000 kcal</p>

      </div>

      {/* Food History */}

      <div className="page-box">

        <h2>🍽️ Food History</h2>

        {foods.map((food, index) => (

          <div className="food-item" key={index}>

            <h3>🍴 {food.name}</h3>

            <p>Meal: {food.meal}</p>

            <p>Calories: {food.calories} kcal</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Diet;