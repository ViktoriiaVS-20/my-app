import React, { useState } from "react";
import Search from "./Search";
import WeatherForecast from "./WeatherForecast";
import "./styles.css";
import axios from "axios";
import "./WeatherForecast.css";

export default function Weather() {
  let [city, setCity] = useState("");
  let [data, setData] = useState({ loaded: false });

  function displayWeather(response) {
    setData({
      loaded: true,
      date: new Date(response.data.time * 1000),
      city: response.data.city,
      country: response.data.country,
      wind: response.data.wind.speed,
      humidity: response.data.temperature.humidity,
      temperature: response.data.temperature.current,
      icon: `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`,
      description: response.data.condition.description,
    });
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function clickSubmit(event) {
    event.preventDefault();
    let units = "imperial";
    let apiKey = `be08550c2aadfta34dbaac43c863o491`;
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

    axios.get(url).then(displayWeather);
  }

  let form = (
    <div className="Form">
      <form className="mb-3" onSubmit={clickSubmit}>
        <div className="row">
          <div className="col-8">
            <input
              type="search"
              placeholder="Type a city..."
              className="form-control"
              autoComplete="off"
              onChange={updateCity}
            />
          </div>
          <div className="col-3">
            <input type="submit" className="btn" value="Search" />
          </div>
        </div>
      </form>
    </div>
  );

  if (data.loaded) {
    return (
      <div>
        {form}
        <hr />
        <Search data={data} />
        <hr className="mt-0" />
        <WeatherForecast data={data} city={data.city} />
      </div>
    );
  } else {
    return form;
  }
}
