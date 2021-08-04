import React from "react";

export default function ChartVertical({ chart2 }) {
  return (
    <div className="sub-card-2">
      <div className="wrap-shape-2">
        <ul>
          {chart2.map((chart, i) => {
            return <li key={i} style={{ height: `${chart}%` }}></li>;
          })}
        </ul>
      </div>
      <div className="foot-2">
        <div className="sub-foot-2">
          <div className="rounded"></div>
          <p>Text 1</p>
        </div>
        <div className="sub-foot-2">
          <div className="rounded"></div>
          <p>Text 2</p>
        </div>
      </div>
    </div>
  );
}
