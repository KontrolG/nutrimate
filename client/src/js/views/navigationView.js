import { elements, $, getEndScrollPosition } from "./base";
import { smoothScrollTo } from "./smoothScroll";

export const getAnchorElement = ({ target }) => target.closest("a");

export const changeCurrentSectionTo = sectionName => {
  scrollToSection(sectionName);
  changeNavigationItem(sectionName);
}

const scrollToSection = sectionName => {
  const elementThatWrapsTheSections = elements.main;
  const endScrollPosition = getEndScrollPosition("Left", sectionName);
  smoothScrollTo(elementThatWrapsTheSections, { left: endScrollPosition });
}

const changeNavigationItem = sectionName => {
  deactiveNavigationItem();
  activeNavigationItem(sectionName);
}

const deactiveNavigationItem = () =>
  $(".nav__active").classList.remove("nav__active");

const activeNavigationItem = sectionName => {
  const newActiveAnchor = $(`.nav__list a[href*="${sectionName}"]`);
  newActiveAnchor.classList.add("nav__active");
};
