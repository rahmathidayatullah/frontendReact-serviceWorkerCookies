import React from "react";

export default function ChartHorizontal({ months, days, persenMonth }) {
  return (
    <div className="sub-card-1">
      <ul>
        {months.map((month, i) => {
          return (
            <li key={i}>
              <p>{month}</p>
              <div className="wrap-shape">
                <div
                  className="persen-shape"
                  style={{ width: `${persenMonth[i]}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="foot">
        <div className="space-0"></div>
        <ul>
          {days.map((day, i) => {
            return <li key={i}>{day}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
