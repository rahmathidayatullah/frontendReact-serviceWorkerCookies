import React from "react";

export default function Table({ selectData, checkAll, dummyTemp }) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              onChange={(e) => {
                selectData(e, false);
              }}
              name="checkAll"
              checked={checkAll}
            />{" "}
            Name
          </th>
          <th>Category</th>
          <th>Availability</th>
          <th>Arrival</th>
        </tr>
      </thead>
      <tbody>
        {dummyTemp &&
          dummyTemp.map((item, i) => {
            return (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => selectData(e, i)}
                    name="selected"
                    checked={item.selected}
                  />
                  {item.nama}
                </td>
                <td>{item.category}</td>
                <td>{item.avaibility}</td>
                <td>{item.arrival}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
