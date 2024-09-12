import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gyroData, setGyroData] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
  const [logging, setLogging] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [logData, setLogData] = useState([]);  // Store the logged sensor data

  useEffect(() => {
    const handleDeviceOrientation = (event) => {
      setGyroData({
        alpha: event.alpha, // Rotation around the z-axis
        beta: event.beta,   // Rotation around the x-axis
        gamma: event.gamma, // Rotation around the y-axis
      });
    };

    const handleDeviceMotion = (event) => {
      setAccelData({
        x: event.accelerationIncludingGravity.x || 0,
        y: event.accelerationIncludingGravity.y || 0,
        z: event.accelerationIncludingGravity.z || 0,
      });
    };

    // Add event listeners for device orientation and motion
    window.addEventListener('deviceorientation', handleDeviceOrientation);
    window.addEventListener('devicemotion', handleDeviceMotion);

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);

  const toggleLogging = () => {
    if (logging) {
      // Stop logging when button is pressed again
      clearInterval(intervalId);
      setIntervalId(null);
      setLogging(false);
    } else {
      // Start logging at 100Hz (10ms intervals)
      const id = setInterval(() => {
        const newLog = {
          time: new Date().toLocaleTimeString(),
          gyro: { ...gyroData },
          accel: { ...accelData },
        };
        setLogData((prevLogData) => [...prevLogData, newLog]); // Append new data
      }, 10);  // 100Hz = 10ms intervals

      setIntervalId(id);
      setLogging(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
        <h2>Sensor Readings</h2>

        {/* Gyroscope (orientation) data */}
        <h3>Gyroscope</h3>
        <p>Alpha: {gyroData.alpha.toFixed(2)}</p>
        <p>Beta: {gyroData.beta.toFixed(2)}</p>
        <p>Gamma: {gyroData.gamma.toFixed(2)}</p>

        {/* Accelerometer (motion) data */}
        <h3>Accelerometer</h3>
        <p>X: {accelData.x.toFixed(2)}</p>
        <p>Y: {accelData.y.toFixed(2)}</p>
        <p>Z: {accelData.z.toFixed(2)}</p>

        {/* Button to start/stop logging sensor data */}
        <button onClick={toggleLogging}>
          {logging ? 'Stop Logging' : 'Start Logging'}
        </button>

        {/* Display logged sensor data */}
        <h3>Logged Data:</h3>
        <div className="log-container">
          {logData.length === 0 ? (
            <p>No data logged yet</p>
          ) : (
            <ul>
              {logData.map((log, index) => (
                <li key={index}>
                  <strong>{log.time}</strong> - Gyro: [Alpha: {log.gyro.alpha.toFixed(2)}, Beta: {log.gyro.beta.toFixed(2)}, Gamma: {log.gyro.gamma.toFixed(2)}] - 
                  Accel: [X: {log.accel.x.toFixed(2)}, Y: {log.accel.y.toFixed(2)}, Z: {log.accel.z.toFixed(2)}]
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
