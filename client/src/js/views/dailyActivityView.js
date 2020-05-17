import { elements, $, degreesToRadians, clearChilds, fixDecimals } from "./base";
import { createNutrientAmount } from "./components";

export const changeTotalCalories = caloriesAmount => {
  const { currentTotal, caloriesGoal } = caloriesAmount;
  changeCurrentCalories(currentTotal);
  changeCaloriesGoal(caloriesGoal);
};

const changeCurrentCalories = currentCalories =>         
  elements.activityCurrentCalories.textContent = parseInt(currentCalories, 10);

const changeCaloriesGoal = caloriesGoal => 
  elements.activityCaloriesGoal.textContent = parseInt(caloriesGoal, 10);

const deactiveMeal = () => $(".meal__active").classList.remove("meal__active");

const activeMeal = mealName => $(`.tbody__${mealName}`).classList.add("meal__active");

const changeActiveMeal = mealName => {
  deactiveMeal();
  activeMeal(mealName);
}

const deactiveMealSelector = () =>
  $(".meals__selected").classList.remove("meals__selected");

const activeMealSelector = mealName =>
  $(`.meals__swapper button[data-meal-name="${mealName}"`).classList.add("meals__selected");

const changeActiveMealSelector = mealName => {
  deactiveMealSelector();
  activeMealSelector(mealName);
}

export const isMealSelector = target =>
  target.matches(".food__add__swapper button");

export const changeActivityFoodList = mealName => {
  changeActiveMeal(mealName);
  changeActiveMealSelector(mealName);
}

export const renderFood = (food, mealName) => {
  const markup = createFoodAteRow(food);
  $(`.tbody__${mealName}`).insertAdjacentHTML("beforeEnd", markup);
};

const createFoodAteRow = food => {
  const { description, calories } = food;
  return `<tr>
            <td class="foods__ate__name">
              <h4>${description}</h4>
            </td>
            <td class="foods__ate__quantity">
              1
            </td>
            <td class="foods__ate__portion">
              30g
            </td>
            <td class="foods__ate__calories">
              ${createNutrientAmount(calories)}
            </td>
          </tr>`;
};

export const clearMeals = () => {
  Array.from(elements.activityMealsTables).forEach(clearChilds);
}

export const changeActivityGraph = graphValues => {
  const canvas = getCanvasFromElement(elements.activityGraph);
  setCanvasLineStyle(canvas);
  drawGraphValues(canvas, graphValues);
  drawRemainingArc(canvas);
};

const getCanvasFromElement = element => {
  const context = element.getContext("2d");
  const startDegrees = -90;
  const center = getCanvasElementCenter(element);
  const radius = getRadiusFromCanvasSize(element);
  return { element, context, center, radius, startDegrees };
}

const getCanvasElementCenter = ({width, height}) => ({
  x: width / 2,
  y: height / 2
});

const getRadiusFromCanvasSize = ({width, height}) => {
  const circleSize = 0.14;
  return (width + height) * circleSize;
};

const setCanvasLineStyle = ({ context }, width = 20) => {
  context.lineWidth = width;
  // canvasContext.lineCap = "round";
};

const drawGraphValues = (canvas, graphValues) => {
  for (const value of Object.values(graphValues)) {
    drawValueArc(canvas, value);
  }
}

const drawValueArc = (canvas, { color, percentage }) => {
  const endDegrees = getEndDregrees(percentage, canvas.startDegrees);
  drawArc(canvas, color, endDegrees);
  canvas.startDegrees = endDegrees;
};

const getEndDregrees = (percentage, startDegrees) => {
  const degreesPerPercentage = 3.6;
  const valueDegrees = degreesPerPercentage * percentage;
  return startDegrees + valueDegrees;
};

const drawArc = (
  { context, center, radius, startDegrees },
  color,
  endDegrees
) => {
  setColorAndBeginPath(context, color);
  paintArc(
    context,
    center.x,
    center.y,
    radius,
    degreesToRadians(startDegrees),
    degreesToRadians(endDegrees)
  );
};

const setColorAndBeginPath = (context, color) => {
  context.strokeStyle = color;
  context.beginPath();
};

const paintArc = (context, ...arcSettings) => {
  context.arc(...arcSettings);
  context.stroke();
};

const drawRemainingArc = canvas => {
  const circleEndDegrees = 270;
  const { startDegrees } = canvas;
  const remainingDegrees = circleEndDegrees - startDegrees;
  if (remainingDegrees > 0) {
    const remainingArcColor = "rgb(230, 230, 230)"; // Grey
    drawArc(canvas, remainingArcColor, circleEndDegrees);
  }
}

export const changeMacronutrientsTotals = macronutrientsTotals => {
  Object.entries(macronutrientsTotals).forEach(changeMacronutrient);
}

const changeMacronutrient = ([nutrientName, nutrientAmount]) => {
  const nutrientAmountElement = $(`.total__macros span[data-nutrient-name="${nutrientName}"]`);
  nutrientAmountElement.textContent = fixDecimals(nutrientAmount);
}