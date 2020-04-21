import { elements, $, degressToRadians } from "./base";

export const updateCurrentCalories = currentCalories => elements.activityCurrentCalories.textContent = parseInt(currentCalories, 10);
export const updateCaloriesGoal = caloriesGoal => (elements.activityCaloriesGoal.textContent = parseInt(caloriesGoal), 10);

const deactiveList = () => $(".tbody__active").classList.remove("tbody__active");
const activeList = mealName => $(`.tbody__${mealName}`).classList.add("tbody__active");
const changeActiveList = mealName => {
  deactiveList();
  activeList(mealName);
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
  changeActiveList(mealName);
  changeActiveMealSelector(mealName);
}

export const addFood = ({displayName, calories}, mealName) => {
  const markup = `<tr>
                    <td class="foods__ate__name">
                      <h4>${displayName}</h4>
                    </td>
                    <td class="foods__ate__calories"><strong>${calories}</strong> kcal</td>
                  </tr>`;
  $(`.tbody__${mealName}`).insertAdjacentHTML("beforeEnd", markup);
}

export const clearLists = () => {
  [...elements.activityFoodsList].forEach(foodsList => {
    while (foodsList.childElementCount) foodsList.removeChild(foodsList.lastElementChild);
  });
}

export const updateActivitGraph = (data) => {
  const canvasContext = elements.activityGraph.getContext("2d");

  const { width, height } = elements.activityGraph;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = (width + height) * 0.14;

  let startDegrees = -90;
  canvasContext.lineWidth = 20;
  // canvasContext.lineCap = "round";
  for (const value in data) {
    if (data.hasOwnProperty(value)) {
      const { color, percentage } = data[value];
      const endDegrees = startDegrees + 3.6 * percentage;
      canvasContext.strokeStyle = color;
      canvasContext.beginPath();
      canvasContext.arc(
        centerX,
        centerY,
        radius,
        degressToRadians(startDegrees),
        degressToRadians(endDegrees)
      );
      canvasContext.stroke();
      startDegrees = endDegrees;
    }
  }
}