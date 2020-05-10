import { elements, $, degressToRadians } from "./base";
import { createNutrientAmount } from "./components";

export const updateTotalCalories = caloriesAmount => {
  const { currentTotal, caloriesGoal } = caloriesAmount;
  updateCurrentCalories(currentTotal);
  updateCaloriesGoal(caloriesGoal);
};

const updateCurrentCalories = currentCalories =>         
  elements.activityCurrentCalories.textContent = parseInt(currentCalories, 10);

const updateCaloriesGoal = caloriesGoal => 
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
  [...elements.activityFoodsList].forEach(foodsList => {
    while (foodsList.childElementCount) foodsList.removeChild(foodsList.lastElementChild);
  });
}

export const updateActivityGraph = data => {
  const canvasContext = elements.activityGraph.getContext("2d");
  const { width, height } = elements.activityGraph;
  const center = {
    x: width / 2,
    y: height / 2
  };
  const radius = (width + height) * 0.14;

  let startDegrees = -90;
  canvasContext.lineWidth = 20;
  // canvasContext.lineCap = "round";
  for (const value in data) {
    if (data.hasOwnProperty(value)) {
      const { color, percentage } = data[value];
      const degressPerPercentage = 3.6;
      const degress = degressPerPercentage * percentage;
      const endDegrees = startDegrees + degress;
      canvasContext.strokeStyle = color;
      canvasContext.beginPath();
      canvasContext.arc(
        center.x,
        center.y,
        radius,
        degressToRadians(startDegrees),
        degressToRadians(endDegrees)
      );
      canvasContext.stroke();
      startDegrees = endDegrees;
    }
  }
}