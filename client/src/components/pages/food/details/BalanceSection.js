import React from "react";

const BalanceSection = props => {
  return (
    <section className="food__balance">
      <h4 className="food__balance__title">Calories balance (add titles!)</h4>
      <ul className="food__balance__values">
        <li className="values__now">
          <span className="progress"></span>
        </li>
        <li className="bar">
          <p className="bar__title">now</p>
          <span className="bar__body"></span>
        </li>
        <li className="values__food">
          <span className="progress"></span>
        </li>
        <li className="bar">
          <p className="bar__title bar__remaining">remaining</p>
          <span className="bar__body"></span>
        </li>
        <li className="values__remaining">
          <span className="progress"></span>
        </li>
      </ul>
    </section>
  );
};

export default BalanceSection;
