import React from "react";
import IconClose from "assets/icon/Icon/close";
import IconUnConnect from "assets/icon/Icon/notconnect.png";

export default function ModalNotConnection({ online, setOnline }) {
  return (
    <div className={`modal-main ${online ? "opacity-0" : "opacity-1"}`}>
      <div className="modal-content">
        <IconClose onClick={() => setOnline(true)} />
        <img src={IconUnConnect} alt="IconUnConnect" />
        <p className="modal-title">No internet connection</p>
        <p className="modal-desc">
          Seems like you're not connected to the internet! Check your connection
          and refresh the page.
        </p>
      </div>
    </div>
  );
}
