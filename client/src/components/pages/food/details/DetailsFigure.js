import React from "react";

const DetailsFigure = props => {
  return (
    <figure className="${removeSelector(elementsStrings.foodFigure)}">
      <img src="img/test-food.jpg" alt="${description}" />
      <figcaption className="food__info rounded__box">
        <h3 className="food__name">${description}</h3>
        <QuantitySection />
        <BalanceSection />
        <NutritionFactsSection />
      </figcaption>
    </figure>
  );
};

export default DetailsFigure;
const QuantitySection = () => {
  return (
    
  );
};

const FoodBalance = () => {
  return (
    <div className="food__balance">
      <h4 className="food__balance__title">Calories balance</h4>
      <ul className="food__balance__values">
        <li className="${removeSelector(elementsStrings.balanceValues.now)}">
          <span className="progress"></span>
        </li>
        <li className="bar">
          <p className="bar__title">now</p>
          <span className="bar__body"></span>
        </li>
        <li className="${removeSelector(elementsStrings.balanceValues.food)}">
          <span className="progress"></span>
        </li>
        <li className="bar">
          <p className="bar__title bar__remaining">remaining</p>
          <span className="bar__body"></span>
        </li>
        <li
          className="${removeSelector(
                elementsStrings.balanceValues.remaining
              )}"
        >
          <span className="progress"></span>
        </li>
      </ul>
    </div>
  );
};

const FoodNutrition = () => {
  return (
    <table className="food__nutrients">
      <caption>
        <h4>Nutrition Facts</h4>
      </caption>
      <tbody>
        ${createFragmentOfElements(nutrients, createNutritionFactRow)}
      </tbody>
      <tfoot className="food__nutrients__source">
        <tr>
          <td colspan="2">
            U.S. Department of Agriculture, Agricultural Research Service.{" "}
            <a href="http://fdc.nal.usda.gov" title="FoodData Central Homepage">
              FoodData Central
            </a>
            , 2019.
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
