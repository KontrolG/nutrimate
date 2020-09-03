import React from "react";
import NutritionFactsTableBody from "./NutritionFactsTableBody";

const NutrientsFactsSection = ({ foodNutrients }) => {
  return (
    <section>
      <table className="food__nutrients">
        <caption>
          <h4>Nutrition Facts</h4>
        </caption>
        <NutritionFactsTableBody nutrients={foodNutrients} />
        <tfoot className="food__nutrients__source">
          <tr>
            <td colSpan="2">
              Source: U.S. Department of Agriculture, Agricultural Research
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
    </section>
  );
};

export default NutrientsFactsSection;
