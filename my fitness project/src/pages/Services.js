
import React from 'react';
import { ImFontSize } from 'react-icons/im';


const FitnessServices = () => {
  const services = [
    {
      name: 'Massage Therapy',
      description: 'Relax and rejuvenate with our professional massage therapy services.',
    },
    {
      name: 'Personal Training',
      description: 'Get personalized fitness plans and guidance from our certified trainers.',
    },
    {
      name: 'Certifications',
      description: 'Achieve your fitness goals with our range of certification programs and workshops.',
    },
    // Add more services as needed
  ];

  return (
    <div className="fitness-services">
  <div className="services-header">
    <h1 style={{ fontSize: "24px" }}>Our Services</h1>
  </div>
  <div className="services-list">
    {services.map((service, index) => (
      <div key={index} className="service">
        <h2>{service.name}</h2>
        <p>{service.description}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default FitnessServices;
