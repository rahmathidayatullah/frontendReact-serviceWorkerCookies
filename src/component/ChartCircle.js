import React from "react";

export default function ChartCircle() {
  return (
    <div className="sub-card-3">
      <figure className="chart" data-percent="75">
        <figcaption>70%</figcaption>
        <div className="bg-line"></div>
        <svg width="200" height="200">
          <circle
            className="outer"
            cx="95"
            cy="95"
            r="85"
            transform="rotate(-90, 95, 95)"
          />
        </svg>
      </figure>
      <div className="wrap-text">
        <div className="text">
          <div className="rounded-3"></div>
          <div className="desc-text">
            <p className="title">Text 1</p>
            <p className="desc">210 Guest(s)</p>
          </div>
        </div>
        <div className="line"></div>
        <div className="text">
          <div className="rounded-3"></div>
          <div className="desc-text">
            <p className="title">Text 1</p>
            <p className="desc">210 Guest(s)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
