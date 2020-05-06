export const $ = selector => {
  const elements = document.querySelectorAll(selector);
  return elements.length > 1 ? elements : elements[0];
}

export const elements = {
  header: $("header"),
  searchForm: $(".search__form"),
  searchBtn: $(".search__btn"),
  searchInput: $(".search__input"),
  main: $("main"),
  resultsSection: $(".results"),
  resultsList: $(".results__list"),
  resultsLoader: $(".results__loader"),
  foodSection: $(".food"),
  foodAddBtn: $(".food__add__btn"),
  foodAddPopup: $(".food__add__popup"),
  foodAddSwapper: $(".food__add__swapper"),
  activitySection: $(".daily__activity"),
  activityCurrentCalories: $(".current__calories"),
  activityCaloriesGoal: $(".calories__goal"),
  activityMealsSwapperBtns: $(".meals__swapper li button"),
  dateInput: $(".date__input"),
  activityGraph: $(".activity__graph"),
  activityFoodsList: $(".foods__ate__list tbody"),
  navigationList: $(".nav__list")
};

export const elementsStrings = {
  foodFigure: ".food__fig",
  balanceValues: {
    now: ".values__now",
    food: ".values__food",
    remaining: ".values__remaining"
  },
  quantityInput: ".quantity__input",
  portionSelect: ".portion__select",
};
// export const renderElementIn = (element, position, createFunction, ) =>

export const removeSelector = elementString =>
  elementString.replace(/[\.|\#]/, "");

export const fixDecimals = (number, digits = 1) =>
  parseFloat(number).toFixed(digits);

export const removeHighlight = element => element.classList.remove("highlight");

export const toggleCentered = (element, force = false) =>
  element.classList.toggle("centered", force);

export const isHidden = element => element.classList.includes("hidden");
export const toggleHideShow = element => element.classList.toggle("hidden");
export const hide = element => element.classList.add("hidden");
export const show = element => element.classList.remove("hidden");

export const degressToRadians = degrees => (Math.PI / 180) * degrees;

export const debounce = (func, wait = 20, immediate = true) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}