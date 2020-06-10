/* CADA VEZ QUE SE LLAMA UNA FUNCION, SE DEBE RECORRER
LOS OBJETOS, ¿HACER UNA SOLA FUNCION QUE TOME UN ENTRY DEL OBJETO Y APLIQUE LOS CAMBIOS DE FORMA SIMULTANEA?
 
¿POR QUE ESTA SOLUCION ES MAS COMPLEJA?
*/

export const smoothScrollTo = (element, options) => {
  const hasSmoothScroll = element.scrollTo !== undefined;
  if (true/* hasSmoothScroll */) {
    element.scrollTo({ ...options, behavior: "smooth" });
  } else {
    console.time(`Scrolleada`);
    scrollUntilEndIsReached(element, options);
  }
};

const scrollUntilEndIsReached = (element, end) => {
  const step = getStepOptions(element, end);
  const newEndPosition = getEndScrollPosition(element, end);
  console.log({end}, {newEndPosition});
  const scrollate = { element, end: newEndPosition, step };
  moveScrollStepByStep(scrollate);
};

const getEndScrollPosition = (element, end) => {
  const maxScrollPosition = {
    top: element.scrollHeight - element.offsetHeight,
    left: element.scrollWidth - element.offsetWidth
  };
  const newEndPosition = {};

  for (const [name, value] of Object.entries(end)) {
    const maxScrollValue = maxScrollPosition[name];
    const endIsGreatherThanMax = value > maxScrollValue;
    newEndPosition[name] = endIsGreatherThanMax ? maxScrollValue : value;
  }

  return newEndPosition;  
};

const getStepOptions = (element, end) => {
  const start = getCurrentScrollPosition(element);
  const stepOptions = {};
  for (const [name, value] of Object.entries(end)) {
    stepOptions[name] = getStep(start[name], value);
  }
  return stepOptions;
};

const getStep = (start, end) => {
  const difference = end - start;
  const onePercentOfTheDifference = difference / 100;
  const percentagePerStep = 2;
  return onePercentOfTheDifference * percentagePerStep;
};

const getCurrentScrollPosition = element => {
  const top = element.scrollTop;
  const left = element.scrollLeft;
  return { top, left };
};

const moveScrollStepByStep = scrollate => {
  moveScrollPositionToStep(scrollate);
  if (!hasReachedEnd(scrollate)) {
    setTimeout(moveScrollStepByStep, 1, scrollate);
  } else {
    console.timeEnd(`Scrolleada`);
  }
}

const moveScrollPositionToStep = scrollate => {
  const newScrollPosition = getNewScrollPosition(scrollate);
  setScrollPosition(scrollate, newScrollPosition);  
};

/* --------------------------------------- */
/* |                                     | */
/* |                                     | */
/* |        REFACTORIZE THIS             | */
/* |                                     | */
/* |                                     | */
/* --------------------------------------- */
const getNewScrollPosition = ({ element, end, step }) => {
  const start = getCurrentScrollPosition(element);
  const directionSigns = getDirectionSigns(step);
  const newScrollPosition = {};
  for (const [name, value] of Object.entries(step)) {
    const newValue = start[name] + value;
    const directionSign = directionSigns[name];
    const hasPassedEnd = newValue * directionSign > end[name] * directionSign;
    newScrollPosition[name] = hasPassedEnd ? end[name] : newValue;
  }

  return newScrollPosition;
};

const getDirectionSigns = step => {
  const initialDirectionSigns = {};
  return Object.entries(step).reduce(toDirectionSigns, initialDirectionSigns);
}

const toDirectionSigns = (directionSigns, [ name, value ]) => {
  directionSigns[name] = Math.sign(value);
  return directionSigns;
};


const setScrollPosition = ({ element }, newScrollPosition) => {
  for (const [name, value] of Object.entries(newScrollPosition)) {
    const propertyName = getPropertyName(name);
    element[propertyName] = value;
  }
}

const getPropertyName = entryName => {
  const propertiesNames = {
    left: "scrollLeft",
    top: "scrollTop"
  };
  return propertiesNames[entryName];
};

const hasReachedEnd = ({ element, end }) => {
  const currentPosition = getCurrentScrollPosition(element);
  for (const [name, value] of Object.entries(end)) {
    console.log(currentPosition[name]);
    if (currentPosition[name] !== value) {
      return false;
    }
  }
  return true;
};