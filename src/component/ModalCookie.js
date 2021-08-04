import React from "react";
import IconInfo from "assets/icon/Icon/info";

export default function ModalCookie({ showCookie, checkTime }) {
  return (
    <div className={`cookie ${showCookie ? "left-0" : "left-100"}`}>
      <IconInfo />
      <p>Show cookies first load and expired 1 minutes</p>
      <button onClick={checkTime}>OK</button>
    </div>
  );
}
