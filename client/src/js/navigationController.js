import { elements } from "./views/base";
import { changeCurrentSectionTo } from "./views/navigationView";

const handleNavigationList = e => {
  const anchorElement = e.target.closest("a");
  if (anchorElement) {
    e.preventDefault();
    const sectionName = anchorElement.hash.replace("#", "");
    changeCurrentSectionTo(sectionName);
  }
}

elements.navigationList.addEventListener("click", handleNavigationList)