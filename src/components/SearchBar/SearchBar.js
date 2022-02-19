import { useRef } from "react";

import styles from "./SearchBar.module.css";

// using form to collect user input
const SearchBar = ({fetchWeather, reset}) => {
  // ref for user input
  const cityRef = useRef();
  const countryRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    // extract current value from inputs.
    const city = cityRef.current.value;
    const country = countryRef.current.value;

    // pass the user inputs toward fetching function.
    fetchWeather(city, country);

    // clear user input after sending.
    cityRef.current.value = "";
    countryRef.current.value = "";
  };

  return (
    <section>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="city">City:</label>
          <input id="city" type="text" ref={cityRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="country">Country:</label>
          <input id="country" type="text" ref={countryRef} />
        </div>
        <div className={styles.actions}>
          <button type="submit">Search</button>
          <button type="button" onClick={reset}>Clear</button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
