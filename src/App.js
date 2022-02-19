
import useWeather from "./hooks/useWeather";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import SearchHistory from "./components/SearchHistory/SearchHistory";

// Loading animation when waiting for HTTP response.
import LoadingAnimation from "./components/UI/LoadingAnimation/LoadingAnimation";

import "./App.css";

function App() {
  // custom hook, for sending request and interacting with request status.
  const { data, isLoading, error, sendRequest, reset } = useWeather();

  const fetchWeatherHandler = (city, country) => {
    sendRequest(city, country);
  };

  return (
    <main className="weather-board">
      {isLoading && <LoadingAnimation />}
      <h1>Today's Weather</h1>
      <div className="panel">
        <SearchBar fetchWeather={fetchWeatherHandler} reset={reset} />
        <WeatherInfo error={error} data={data} />
        <SearchHistory send={fetchWeatherHandler} />
      </div>
    </main>
  );
}

export default App;
