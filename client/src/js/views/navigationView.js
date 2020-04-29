import { elements, $ } from "./base";

export const changeCurrentSectionTo = sectionName => {
  scrollTo(sectionName);
  changeNavigationItem(sectionName);
}

const scrollTo = targetElementName => {
  const { offsetLeft } = elements[targetElementName];
  smoothScroll(offsetLeft);
};

const smoothScroll = end => {
  const { main } = elements;
  let start = main.scrollLeft;
  const directionSign = Math.sign(end - start);
  const interval = setInterval(() => {
    start += 5 * directionSign;
    main.scrollLeft = start;
    if (start * directionSign >= end * directionSign) {
      clearInterval(interval);
      main.scrollLeft = end;
    };
  }, 0);
};

const changeNavigationItem = sectionName => {
  const newActiveAnchor = $(`.nav__list a[href*="${sectionName}"]`);
  deactiveNavigationItem();
  activeNavigationItem(newActiveAnchor);
}

const deactiveNavigationItem = () =>
  $(".nav__active").classList.remove("nav__active");
const activeNavigationItem = anchorElement => anchorElement.classList.add("nav__active");
