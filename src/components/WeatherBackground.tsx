import React from 'react';
import './WeatherBackground.css';


const WeatherBackground = () => {
  return (
    <div>
      <div className="bg"></div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
    </div>
  );
};

export default WeatherBackground;
