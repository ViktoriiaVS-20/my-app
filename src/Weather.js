import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [data, setData] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [message, setMessage] = useState("");

  function displayWeather(response) {
    console.log(response.data);
    city = response.data.name;
    setMessage(city);
    setLoaded(true);
    setTemperature(response.data.main.temp);
    setData({
      country: response.data.sys.country,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function clickSubmit(event) {
    event.preventDefault();
    let units = "metric";
    let apiKey = `eb4b9c9f52e39ba16b6dff58dd6bccb0`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(url).then(displayWeather);
  }

  function showFahrenheiht(event) {
    event.preventDefault();
    setTemperature(Math.round((temperature * 9) / 5 + 32));
  }

  let form = (
    <div className="Form">
      <form className="mb-3" onSubmit={clickSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Type a city..."
              className="form-control"
              autoComplete="off"
              onChange={updateCity}
            />
          </div>
          <div className="col-3">
            <input type="submit" className="btn w-100" value="Search" />
          </div>
        </div>
      </form>
    </div>
  );

  if (loaded) {
    return (
      <div className="Weather">
        {form}
        <div className="overview">
          <h1>
            {message} | {data.country}
          </h1>
          <ul>
            <li>Friday 16:00</li>
            <li className="weather-desc">{data.description}</li>
          </ul>
        </div>
        <div className="row">
          <div className="col-6">
            <div className=" row weather-temperature">
              <div className="col-md-6 row-6">
                <img src={data.icon} alt={data.description} className="img" />
              </div>
              <div className="col-md-6 row-6 mt-3 mt-md-0">
                <strong>{Math.round(temperature)}</strong>
                <span className="units">
                  <a href="/">°C</a> |
                  <a href="/" onClick={showFahrenheiht}>
                    °F
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <ul>
              <li>Humidity: {data.humidity}%</li>
              <li>Wind: {data.wind} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
