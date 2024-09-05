import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gyroData, setGyroData] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const handleDeviceOrientation = (event) => {
      // DeviceOrientationEvent provides the orientation angles
      setGyroData({
        alpha: event.alpha, // Rotation around the z-axis
        beta: event.beta,   // Rotation around the x-axis
        gamma: event.gamma, // Rotation around the y-axis
      });
    };

    const handleDeviceMotion = (event) => {
      // DeviceMotionEvent provides the acceleration data
      setAccelData({
        x: event.accelerationIncludingGravity.x || 0,
        y: event.accelerationIncludingGravity.y || 0,
        z: event.accelerationIncludingGravity.z || 0,
      });
    };

    // Add event listeners
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    window.addEventListener('devicemotion', handleDeviceMotion);

    // Cleanup function
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
        <h2>Sensor Readings</h2>
        <h3>Gyroscope</h3>
        <p>Alpha: {gyroData.alpha.toFixed(2)}</p>
        <p>Beta: {gyroData.beta.toFixed(2)}</p>
        <p>Gamma: {gyroData.gamma.toFixed(2)}</p>
        <h3>Accelerometer</h3>
        <p>X: {accelData.x.toFixed(2)}</p>
        <p>Y: {accelData.y.toFixed(2)}</p>
        <p>Z: {accelData.z.toFixed(2)}</p>
      </header>
    </div>
  );
}

export default App;
