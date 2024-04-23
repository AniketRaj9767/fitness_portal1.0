import React, { useState } from 'react';

const SubscriptionPlan = ({ plan }) => {
  return (
    <div className="subscription-plan">
      <h2>{plan.name}</h2>
      <p>{plan.description}</p>
      <p>Price: ${plan.price} / month</p>
      <ul>
        {plan.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button onClick={() => subscribe(plan)}>Subscribe</button>
    </div>
  );
};

const subscribe = (plan) => {
  // Implement subscription logic here, e.g., redirect to payment page
  console.log(`Subscribed to ${plan.name}`);
};

const SubscriptionPlans = () => {
  const plans = [
    {
      name: 'Basic Plan',
      description: 'Access to gym facilities during off-peak hours',
      price: 29.99,
      features: ['Access to gym equipment', 'Locker room access', 'Off-peak hours only'],
    },
    {
      name: 'Premium Plan',
      description: 'Unlimited access to gym facilities at any time',
      price: 49.99,
      features: ['Unlimited access to gym equipment', '24/7 access', 'Locker room access', 'Sauna and spa included'],
    },
    {
      name: 'Family Plan',
      description: 'Subscription for a family of up to 4 members',
      price: 89.99,
      features: ['Access for up to 4 family members', '24/7 access', 'Locker room access', 'Discounts on group classes'],
    },
  ];

  return (
    <div className="subscription-plans">
      <h1>Subscription Plans</h1>
      {plans.map((plan, index) => (
        <SubscriptionPlan key={index} plan={plan} />
      ))}
    </div>
  );
};

export default SubscriptionPlans;
