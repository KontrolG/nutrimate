import React from "react";

const TotalMacros = props => {
  return (
    <ul className="total__macros">
      <li>
        <span className="dot breakfast__dot"></span> Protein
        <p>
          <span data-nutrient-name="protein">0</span>g
        </p>
      </li>
      <li>
        Carbs
        <p>
          <span data-nutrient-name="carbohydrate">0</span>g
        </p>
      </li>
      <li>
        Fat
        <p>
          <span data-nutrient-name="fat">0</span>g
        </p>
      </li>
      <li>
        Fiber
        <p>
          <span data-nutrient-name="fiber">0</span>g
        </p>
      </li>
    </ul>
  );
};

export default TotalMacros;
