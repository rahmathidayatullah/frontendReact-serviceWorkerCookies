import React from "react";
import IconAssign from "assets/icon/Icon/assign";
import IconTrash from "assets/icon/Icon/trash";
import IconClose from "assets/icon/Icon/close";

export default function ModalNotice({
  setShowNotice,
  jumlahSelect,
  deleteData,
  showNotice,
}) {
  return (
    <div className={`notice-select ${showNotice ? "bottom-50" : "bottom-0"}`}>
      <div className="selected-v">
        <IconClose onClick={setShowNotice} />
        <p>{jumlahSelect} Table Selected</p>
      </div>
      <div className="wrap-btn">
        <button className="btn-assign">
          <IconAssign />
          Assign Category
        </button>
        <button className="btn-delete" onClick={deleteData}>
          <IconTrash />
          Delete Table
        </button>
      </div>
    </div>
  );
}
