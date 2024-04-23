import React, { useState } from 'react';
// import './page.css';

const Trainer = () => {
  // State for Exercise Suggestions
  const [exercise, setExercise] = useState('');

  const suggestExercise = (event) => {
    setExercise(event.target.value);
  };

  const submitExerciseSuggestion = () => {
    // Implement logic to submit exercise suggestion
    console.log(`Suggested exercise: ${exercise}`);
  };

  // State for Diet Plans
  const [dietPlan, setDietPlan] = useState('');

  const createDietPlan = (event) => {
    setDietPlan(event.target.value);
  };

  const submitDietPlan = () => {
    // Implement logic to create diet plan
    console.log(`Created diet plan: ${dietPlan}`);
  };

  // Subscription Plans Data
  const plans = [
    { name: 'Basic', price: 29.99 },
    { name: 'Premium', price: 49.99 },
    { name: 'Deluxe', price: 79.99 },
  ];

  const handleSubscribe = (plan) => {
    // Implement logic to charge user according to plan
    console.log(`Subscribed to ${plan.name} plan for $${plan.price}`);
  };

  return (
    <div>
      <h2>Exercise Suggestions</h2>
      <input
        type="text"
        value={exercise}
        onChange={suggestExercise}
        placeholder="Enter exercise suggestion"
      />
      <button onClick={submitExerciseSuggestion}>Submit Exercise Suggestion</button>

      <h2>Diet Plans</h2>
      <input
        type="text"
        value={dietPlan}
        onChange={createDietPlan}
        placeholder="Enter diet plan"
      />
      <button onClick={submitDietPlan}>Submit Diet Plan</button>

      <h2>Subscription Plans</h2>
      <ul>
        {plans.map((plan, index) => (
          <li key={index}>
            {plan.name}: ${plan.price}{' '}
            <button onClick={() => handleSubscribe(plan)}>Subscribe</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trainer;
