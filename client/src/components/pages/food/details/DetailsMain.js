import React from "react";
import Main from "../../../layout/Main";
import QuantitySection from "./QuantitySection";

const DetailsMain = props => {
  return (
    <Main>
      {/* <header>
        <h3 className="food__name">description</h3>
      </header>
      <QuantitySection /> */}
      <section id="FoodDetails">
        <figure className="${removeSelector(elementsStrings.foodFigure)}">
          <img src="img/test-food.jpg" alt="${description}" />
          <figcaption className="food__info rounded__box">
            <h3 className="food__name">$description</h3>
            <form className="food__quantity">
              <p className="food__calories calories">
                {/* ${createNutrientAmount(calories)} */}
              </p>
              <span className="field__wrapper input__wrapper">
                {/* ${createQuantityInput()}$
                {createLabelFor("quantityInput", "Quantity")} */}
              </span>
              <span className="multiply__sign">&Cross;</span>
              <span className="field__wrapper select__wrapper">
                {/* ${createPortionSelect(portions)}$
                {createLabelFor("portionSelect", "Portion")} */}
              </span>
              <dl className="food__macros macros__data">
                {/* $
                {createFragmentOfElements(
                  [protein, carbohydrate, fat, fiber],
                  createMacroDefinition
                )} */}
              </dl>
            </form>
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
            <table className="food__nutrients">
              <caption>
                <h4>Nutrition Facts</h4>
              </caption>
              <tbody>
                {/* ${createFragmentOfElements(nutrients, createNutritionFactRow)} */}
              </tbody>
              <tfoot className="food__nutrients__source">
                <tr>
                  <td colSpan="2">
                    U.S. Department of Agriculture, Agricultural Research
                    Service.{" "}
                    <a
                      href="http://fdc.nal.usda.gov"
                      title="FoodData Central Homepage"
                    >
                      FoodData Central
                    </a>
                    , 2019.
                  </td>
                </tr>
              </tfoot>
            </table>
          </figcaption>
        </figure>
      </section>
    </Main>
  );
};

export default DetailsMain;
