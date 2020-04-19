import { elements } from "./views/base";
import { changeSection } from "./views/navigationView";

const handleNavigationList = e => {
  const anchorElement = e.target.closest("a");
  if (anchorElement) {
    e.preventDefault();
    const sectionName = anchorElement.hash.replace("#", "");
    changeSection(sectionName);
  }
}

elements.navigationList.addEventListener("click", handleNavigationList)