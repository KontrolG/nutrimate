export const $ = selector => {
  const elements = document.querySelectorAll(selector);
  return elements.length > 1 ? elements : elements[0];
}

export const fixDecimals = (number, digits = 1) => number.toFixed(digits).replace(".", ",");

export const removeHighlight = element => element.classList.remove("highlight");

export const toggleCentered = (element, force = false) => element.classList.toggle("centered", force);

export const hide = element => element.classList.add("hidden");

export const show = element => element.classList.remove("hidden");

export const elements = {
  header: $("header"),
  searchForm: $(".search__form"),
  searchBtn: $(".search__btn"),
  searchInput: $(".search__input"),
  resultsSection: $(".results"),
  resultsList: $(".results__list"),
  resultsLoader: $(".results__loader")
}

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