import styles from "./WeatherInfo.module.css";

// for displaying the output of searching API.
const WeatherInfo = ({ data, error }) => {
  // default content
  let content = <p className={styles.default}>Check your wether info.</p>;

  if (error) {
    content = <p className={styles.error}>{error}</p>;
  }

  // only extract the properties when data is not faulcy.
  if (!error && data) {
    const city = data.city;
    const country = data.country;
    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;
    const humidity = data.main.humidity;
    const status = data.weather[0].main;
    const description = data.weather[0].description;

    const timeObj = data.time;
    const year = timeObj.getFullYear();
    let month = timeObj.getMonth() + 1;
    month = (parseInt(month) < 10 ? "0" : "") + month;
    const date = timeObj.getDate();

    // split the time string by ":", hour : minutes : seconds.
    const time = timeObj.toLocaleTimeString().split(":");
    // define timeMark by checking if 'hour' is greater than 12.
    const timeMark = parseInt(time[0]) > 12 ? "PM" : "AM";
    // subtract 'hour' by 12 if greater than 12.
    let hour = parseInt(time[0]) > 12 ? time[0] - 12 : time[0];
    // add "0" before current number if hour is smaller than 10.
    hour = (parseInt(hour) < 10 ? "0" : "") + hour;

    const minutes = time[1];

    content = (
      <section className={styles.info}>
        <p>
          {city}, {country}
        </p>
        <p className={styles.status}>{status}</p>
        <p>
          <span>Description:</span> {description}
        </p>
        <p>
          <span>Temperature:</span> {minTemp}C~{maxTemp}C
        </p>
        <p>
          <span>Humidity:</span> {humidity}%
        </p>
        <p>
          <span> Time:</span> {year}-{month}-{date} {hour}:{minutes} {timeMark}
        </p>
      </section>
    );
  }

  return <section>{content}</section>;
};

export default WeatherInfo;
