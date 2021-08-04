import React, { useEffect, useState } from "react";

const DelayMapHooks = () => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= 3; i++) {
      setTimeout(() => setArray((prevState) => [...prevState, i]), 1000 * i);
    }
  }, []);

  return (
    <div>
      {array.map((elem, key) => {
        return <div>Number: {elem}</div>;
      })}
    </div>
  );
};

export default DelayMapHooks;
