import { elements, getHashWithoutNumberSign } from "./views/base";
import { getAnchorElement, changeCurrentSectionTo } from "./views/navigationView";

const handleChangeSection = event => {
  event.preventDefault();
  changeSectionIfAnchorWasClicked(event);
}

const changeSectionIfAnchorWasClicked = event => {
  const anchorElement = getAnchorElement(event);
  if (anchorElement) {
    changeToAnchorSection(anchorElement);
  }
}

const changeToAnchorSection = anchorElement => {
  const sectionName = getHashWithoutNumberSign(anchorElement);
  changeCurrentSectionTo(sectionName);
};

elements.navigationList.addEventListener("click", handleChangeSection)