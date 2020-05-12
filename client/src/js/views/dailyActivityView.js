import { elements, $, degreesToRadians, clearChilds } from "./base";
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
  const { canvasContext, center, radius } = getGraphSettings(elements.activityGraph);  
  setCanvasLineStyle(canvasContext);
  const start = { degrees: -90 };
  for (const { color, percentage } of Object.values(graphValues)) {
    createGraphArc(canvasContext, color, percentage, center, radius, start);
  }
};

const getGraphSettings = canvasElement => {
  const { width, height } = canvasElement;
  const center = getCanvasElementCenter(width, height);
  const radius = getRadiusFromCanvasSize(width, height);
  const canvasContext = canvasElement.getContext("2d");
  return { canvasContext, center, radius };
};

const getCanvasElementCenter = (width, height) => ({
  x: width / 2,
  y: height / 2
});

const getRadiusFromCanvasSize = (width, height) => {
  const circleSize = 0.14;
  return (width + height) * circleSize;
}

const setCanvasLineStyle = (canvasContext, width = 20) => {
  canvasContext.lineWidth = width;
  // canvasContext.lineCap = "round";
};

const createGraphArc = (canvasContext, color, percentage, center, radius, start) => {
  const endDegrees = getEndDregrees(percentage, start);
  drawArc(canvasContext, color, center, radius, start, endDegrees);
  start.degrees = endDegrees;
};

const getEndDregrees = (percentage, start) => {
  const degreesPerPercentage = 3.6;
  const degrees = degreesPerPercentage * percentage;
  return start.degrees + degrees;
}

const drawArc = (canvasContext, color, center, radius, start, endDegrees) => {
  setColorAndBeginPath(canvasContext, color);
  paintArc(
    canvasContext,
    center.x,
    center.y,
    radius,
    degreesToRadians(start.degrees),
    degreesToRadians(endDegrees)
  );
}

const setColorAndBeginPath = (canvasContext, color) => {
  canvasContext.strokeStyle = color;
  canvasContext.beginPath();
};

const paintArc = (canvasContext, ...arcSettings) => {
  canvasContext.arc(...arcSettings);
  canvasContext.stroke();
};