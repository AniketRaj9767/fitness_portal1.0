import React, { useState } from 'react';
// import './userDashboard.css';

// Define diet plans for different goals
const dietPlans = {
  lean: {
    breakfast: 'Egg whites and spinach omelette',
    lunch: 'Grilled chicken salad with olive oil dressing',
    dinner: 'Baked fish with steamed vegetables',
    snacks: 'Greek yogurt with berries'
  },
  gain: {
    breakfast: 'Oatmeal with bananas and almond butter',
    lunch: 'Quinoa, black beans, and avocado bowl',
    dinner: 'Grilled steak with sweet potatoes and broccoli',
    snacks: 'Protein shake with milk and peanut butter'
  },
  maintain: {
    breakfast: 'Whole grain toast with avocado and poached eggs',
    lunch: 'Brown rice, grilled tofu, and mixed vegetables',
    dinner: 'Salmon with quinoa and asparagus',
    snacks: 'Mixed nuts and fruit'
  }
};

const DietPlanner = () => {
  const [goal, setGoal] = useState('lean');

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  return (
    <div>
      <h1>Diet Planner</h1>
      <label>
        Select your goal:
        <select value={goal} onChange={handleGoalChange}>
          <option value="lean">Lean</option>
          <option value="gain">Gain</option>
          <option value="maintain">Maintain</option>
        </select>
      </label>
      <h2>Your Diet Plan</h2>
      <p><strong>Breakfast:</strong> {dietPlans[goal].breakfast}</p>
      <p><strong>Lunch:</strong> {dietPlans[goal].lunch}</p>
      <p><strong>Dinner:</strong> {dietPlans[goal].dinner}</p>
      <p><strong>Snacks:</strong> {dietPlans[goal].snacks}</p>
    </div>
  );
};

export default DietPlanner;
