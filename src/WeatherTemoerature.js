import React, { useState } from "react";

export default function WeatherTemperature(props) {
  const [units, setUnits] = useState("celsius");

  function showFahrenheiht(event) {
    event.preventDefault();
    setUnits("fahrenheiht");
  }
  function showCelsius(event) {
    event.preventDefault();
    setUnits("celsius");
  }

  if (units === "celsius") {
    return (
      <div className="weather-temperature">
        <strong>{Math.round(props.celsius)}</strong>
        <span className="units">
          <a href="/" className="celsius">
            °C
          </a>{" "}
          |
          <a href="/" onClick={showFahrenheiht}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    let fahrenheihtTemperature = Math.round((props.celsius * 9) / 5 + 32);
    return (
      <div className="weather-temperature">
        <strong>{fahrenheihtTemperature}</strong>
        <span className="unit">
          <a href="/" onClick={showCelsius}>
            °C
          </a>{" "}
          |
          <a href="/" className="fahrenheiht">
            °F
          </a>
        </span>
      </div>
    );
  }
}
