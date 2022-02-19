import { useState, useCallback, useContext } from "react";

import RecordContext from "../store/record-context";

// default static value.
const APPID = "d53885324c5f8ca7de24669987b365a6";
const LIMIT = 1;

// for fetching data from OpenWeather.
const useWeather = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addRecord } = useContext(RecordContext);

  // the function to be outsource.
  const sendRequest = useCallback(
    async (city, country) => {
      setIsLoading(true);
      setError(null);
      try {
        // request for accurate position of specified location.
        const locationResponse = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=${LIMIT}&id=524901&appid=${APPID}`
        );
        const locationData = await locationResponse.json();
        if (!locationResponse.ok) {
          throw new Error("failed to fetch location data.");
        }

        // extract the exact position from first response.
        const { lat, lon } = locationData[0];

        // request for weather data by extracted position data.
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APPID}`;
        const weatherResponse = await fetch(url);
        const weatherData = await weatherResponse.json();
        if (!weatherResponse.ok) {
          throw new Error("failed to fetch weather data.");
        }

        const time = new Date();

        // add the new search into searching record.
        addRecord({ city, country, time });

        // append 'city', 'country' and 'current time' to received weather data.
        const newWeather = { ...weatherData, city, country, time };
        setData(newWeather);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    },
    [addRecord]
  );

  // for 'Clear' button, to clear all message.
  const reset = () => {
    setError(null);
    setData(null);
  };

  return {
    data,
    isLoading,
    error,
    sendRequest,
    reset
  };
};

export default useWeather;
