import searchSrc from "../../../assets/png/search.png";
import deleteSrc from "../../../assets/png/garbage.png";

import styles from "./Record.module.css";

const Record = ({ index, record, send, remove }) => {
  const { city, country, time, id } = record;

  // split timeString into 'hour', 'minutes' and 'seconds'.
  const timeArr = time.toLocaleTimeString().split(":");

  // define the timeMark by checking if 'hour' is greater than 12.
  const timeMark = timeArr[0] > 12 ? "PM" : "AM";

  // if hour is greater than 12, subtract by 12.
  // if hour is smaller than 10, add "0" before current number.
  let hour = parseInt(timeArr[0]) > 12 ? timeArr[0] - 12 : timeArr[0];
  hour = parseInt(timeArr[0]) < 10 ? "0" + hour : hour;

  const minutes = timeArr[1];

  const seconds = timeArr[2];
  const timeString = `${hour}:${minutes}:${seconds} ${timeMark}`;

  // to resend GET request with same config.
  const searchHandler = () => {
    send(city, country);
  };

  // delete history from store.
  const deleteHandler = () => {
    remove(id);
  };

  return (
    <li className={styles.record}>
      <div className={styles.info}>
        {index + 1}. <span>{city}</span>, {country}
      </div>
      <div className={styles.actions}>
        <p>{timeString}</p>
        <div className={styles.search} onClick={searchHandler}>
          <img src={searchSrc} alt="search" />
        </div>
        <div className={styles.delete} onClick={deleteHandler}>
          <img src={deleteSrc} alt="delete" />
        </div>
      </div>
    </li>
  );
};

export default Record;
