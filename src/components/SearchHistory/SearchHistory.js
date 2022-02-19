import { useContext } from "react";

import RecordContext from "../../store/record-context";
import Record from "./Record/Record";

import styles from "./SearchHistory.module.css";

// for displaying searched results.
const SearchHistory = ({ send }) => {
  // default content, if no search record.
  const { records, removeRecord } = useContext(RecordContext);
  let list = <p className={styles.default}>No Record</p>;

  // try to render the list only if records is truthy.
  if (records.length > 0) {
    // sort the order of results by time.
    const sortedRecords = records.sort((a,b) => +a.id > +b.id ? -1 : 1);
    list = sortedRecords.map((record, index) => (
      <Record
        key={record.id}
        index={index}
        record={record}
        send={send}
        remove={removeRecord}
      />
    ));
  }
  return (
    <section className={styles.board}>
      <h2>Search History</h2>
      <ul>{list}</ul>
    </section>
  );
};

export default SearchHistory;
