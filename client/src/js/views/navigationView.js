import { elements, $, getEndScrollPosition } from "./base";
import { smoothScrollTo } from "./smoothScroll";

export const getAnchorElement = ({ target }) => target.closest("a");

export const changeCurrentSectionTo = sectionName => {
  const element = elements.main;
  const endScrollPosition = getEndScrollPosition("Left", sectionName);
  smoothScrollTo(element, { left: endScrollPosition });
  changeNavigationItem(sectionName);
}

const changeNavigationItem = sectionName => {
  const newActiveAnchor = $(`.nav__list a[href*="${sectionName}"]`);
  deactiveNavigationItem();
  activeNavigationItem(newActiveAnchor);
}

const deactiveNavigationItem = () =>
  $(".nav__active").classList.remove("nav__active");
const activeNavigationItem = anchorElement => anchorElement.classList.add("nav__active");
