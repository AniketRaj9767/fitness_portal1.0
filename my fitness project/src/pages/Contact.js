import React from 'react';
// import "./page.css";

const ContactPage = () => {
  const outlets = [
    {
      name: 'Main Branch',
      address: '123 Main Street, City, Country',
      phone: '+1 123 456 7890',
      email: 'info@example.com',
      socialMedia: {
        facebook: 'https://www.facebook.com/example',
        twitter: 'https://twitter.com/example',
        instagram: 'https://www.instagram.com/example',
      },
    },
    {
      name: 'Downtown Branch',
      address: '456 Downtown Avenue, City, Country',
      phone: '+1 987 654 3210',
      email: 'downtown@example.com',
      socialMedia: {
        facebook: 'https://www.facebook.com/downtownexample',
        twitter: 'https://twitter.com/downtownexample',
        instagram: 'https://www.instagram.com/downtownexample',
      },
    },
    // Add more outlets as needed
  ];

  return (
    <div>
      <h1>Contact Us</h1>
      {outlets.map((outlet, index) => (
        <div key={index}>
          <h2>{outlet.name}</h2>
          <p>Address: {outlet.address}</p>
          <p>Phone: {outlet.phone}</p>
          <p>Email: {outlet.email}</p>
          <p>Social Media:</p>
          <ul>
            <li>
              <a href={outlet.socialMedia.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li>
              <a href={outlet.socialMedia.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
            </li>
            <li>
              <a href={outlet.socialMedia.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            {/* Add more social media links as needed */}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ContactPage;
