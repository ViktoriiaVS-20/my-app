import "./styles.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="Main">
      <div className="App">
        <h1 className="title"> Weather App</h1>
        <Weather />
      </div>
      <a href="https://github.com/ViktoriiaVS-20/my-app">Open-source code</a>
    </div>
  );
}
