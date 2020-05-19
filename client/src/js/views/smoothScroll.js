export const smoothScrollTo = (element, options) => {
  const hasSmoothScroll = element.scrollTo !== undefined;
  if (!hasSmoothScroll) {
    element.scrollTo({ ...options, behavior: "smooth" });
  } else {
    scrollUntilEndIsReached(element, options);
  }
};

const scrollUntilEndIsReached = (element, end) => {
  const step = getStepOptions(element, end);
  const scrollate = {element, end, step};
  moveScrollStepByStep(scrollate);
};

const getStepOptions = (element, end) => {
  const start = getCurrentScrollPosition(element);
  const stepOptions = {};
  for (const [name, value] of Object.entries(end)) {
    const difference = value - start[name];
    const onePercentOfTheDiffrence = difference / 100;
    const percentagePerSecond = 2.5;
    stepOptions[name] = onePercentOfTheDiffrence * percentagePerSecond;
  }
  return stepOptions;
};

const getCurrentScrollPosition = element => {
  const top = element.scrollTop;
  const left = element.scrollLeft;
  return { top, left };
};

const moveScrollStepByStep = scrollate => {
  moveScrollPositionTo(scrollate);
  if (!hasReachedEnd(scrollate)) {
    setTimeout(moveScrollStepByStep, 1, scrollate);
  }
}

const moveScrollPositionTo = scrollate => {
  const newScrollPosition = getNewScrollPosition(scrollate);
  setScrollPosition(scrollate, newScrollPosition);  
};

const getNewScrollPosition = ({ element, end, step }) => {
  const top = element.scrollTop + step.top;
  const left = element.scrollLeft + step.left;
  /* FALTA MOVER AL SENTIDO CONTRARIO */
  const direction = getDirection();
  return {
    top: top > end.top ? end.top : top,
    left: left > end.left ? end.left : left
  };
}

const setScrollPosition = ({ element }, { top, left }) => {
  element.scrollLeft = left;
  element.scrollTop = top;
}

const hasReachedEnd = ({ element, end }) => {
  const currentPosition = getCurrentScrollPosition(element);
  for (const [name, value] of Object.entries(end)) {
    if (currentPosition[name] !== value) {
      return false;
    }
  }
  return true;
};

const getDirectionSign = (start, end) => {
  return Math.sign(end - start);
};