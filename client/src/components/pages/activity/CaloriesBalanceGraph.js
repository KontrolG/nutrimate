import React, { Fragment } from "react";

const CaloriesBalanceGraph = props => {
  return (
    <Fragment>
      <canvas className="activity__graph"></canvas>
      <ol className="graph__legend">
        <li>
          <span className="dot breakfast__dot"></span> Breakfast
        </li>
        <li>
          <span className="dot lunch__dot"></span> Lunch
        </li>
        <li>
          <span className="dot dinner__dot"></span> Dinner
        </li>
        <li>
          <span className="dot snack__dot"></span> Snack
        </li>
      </ol>
      <div className="total__calories">
        <p>
          <strong className="current__calories">0</strong>/
          <strong className="calories__goal">2000</strong>
        </p>
        <p className="meter__title">Calories</p>
      </div>
    </Fragment>
  );
};

export default CaloriesBalanceGraph;
