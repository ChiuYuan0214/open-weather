import React, { useState } from "react";

const RecordContext = React.createContext({
  records: [],
  addRecord: (record) => {},
  removeRecord: (id) => {},
});

export const RecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const addRecordHandler = (record) => {
    const id = new Date().getTime().toString();
    const newRecord = { ...record, id };
    setRecords((prev) => [...prev, newRecord]);
  };

  const removeRecordHandler = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const contextValue = {
    records,
    addRecord: addRecordHandler,
    removeRecord: removeRecordHandler,
  };

  return (
    <RecordContext.Provider value={contextValue}>
      {children}
    </RecordContext.Provider>
  );
};

export default RecordContext;