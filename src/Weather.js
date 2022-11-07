import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import "./styles.css";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("");
  let [data, setData] = useState({ loaded: false });
  let [temperature, setTemperature] = useState(null);
  let [message, setMessage] = useState("");

  function displayWeather(response) {
    console.log(response.data);
    city = response.data.city;
    setMessage(city);
    setTemperature(response.data.temperature.current);
    setData({
      loaded: true,
      date: new Date(response.data.time * 1000),
      country: response.data.country,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      icon: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
      description: response.data.condition.description,
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function clickSubmit(event) {
    event.preventDefault();
    let units = "metric";
    let apiKey = `be08550c2aadfta34dbaac43c863o491`;
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

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

  if (data.loaded) {
    return (
      <div className="Weather">
        {form}
        <div className="overview">
          <h1>
            {message} | {data.country}
          </h1>
          <ul>
            <li>
              <FormattedDate date={data.date} />
            </li>
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
