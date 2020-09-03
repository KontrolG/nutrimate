import React, { Fragment, createRef } from "react";

const changeActivityGraph = graphValues => {
  const canvas = getCanvasFromElement(elements.activityGraph);
  setCanvasLineStyle(canvas);
  drawGraphValues(canvas, graphValues);
  drawRemainingArc(canvas);
};

const getCanvasFromElement = element => {
  const context = element.getContext("2d");
  const startDegrees = -90;
  const center = getCanvasElementCenter(element);
  const radius = getRadiusFromCanvasSize(element);
  return { element, context, center, radius, startDegrees };
};

const getCanvasElementCenter = ({ width, height }) => ({
  x: width / 2,
  y: height / 2
});

const getRadiusFromCanvasSize = ({ width, height }) => {
  const circleSize = 0.14;
  return (width + height) * circleSize;
};

const setCanvasLineStyle = ({ context }, width = 20) => {
  context.lineWidth = width;
  // canvasContext.lineCap = "round";
};

const drawGraphValues = (canvas, graphValues) => {
  for (const value of Object.values(graphValues)) {
    drawValueArc(canvas, value);
  }
};

const drawValueArc = (canvas, { color, percentage }) => {
  const endDegrees = getEndDregrees(percentage, canvas.startDegrees);
  drawArc(canvas, color, endDegrees);
  canvas.startDegrees = endDegrees;
};

const getEndDregrees = (percentage, startDegrees) => {
  const degreesPerPercentage = 3.6;
  const valueDegrees = degreesPerPercentage * percentage;
  return startDegrees + valueDegrees;
};

const drawArc = (
  { context, center, radius, startDegrees },
  color,
  endDegrees
) => {
  setColorAndBeginPath(context, color);
  paintArc(
    context,
    center.x,
    center.y,
    radius,
    degreesToRadians(startDegrees),
    degreesToRadians(endDegrees)
  );
};

const setColorAndBeginPath = (context, color) => {
  context.strokeStyle = color;
  context.beginPath();
};

const paintArc = (context, ...arcSettings) => {
  context.arc(...arcSettings);
  context.stroke();
};

const drawRemainingArc = canvas => {
  const circleEndDegrees = 270;
  const { startDegrees } = canvas;
  const remainingDegrees = circleEndDegrees - startDegrees;
  if (remainingDegrees > 0) {
    const remainingArcColor = "rgb(230, 230, 230)"; // Grey
    drawArc(canvas, remainingArcColor, circleEndDegrees);
  }
};

const CaloriesBalanceGraph = props => {
  const canvasRef = createRef();
  const canvasContext = getCanvasFromElement(canvasRef);
  return (
    <Fragment>
      <canvas className="activity__graph" ref={canvasRef}></canvas>
      <ol className="graph__legend">
        <li>
          <span className="dot breakfast__dot"></span> Breakfast
        </li>
        <li>
          <span className="dot lunch__dot"></span> Lunch
        </li>
        <li>
          <span className="dot dinner__dot"></span> Dinner
        </li>
        <li>
          <span className="dot snack__dot"></span> Snack
        </li>
      </ol>
      <div className="total__calories">
        <p>
          <strong className="current__calories">0</strong>/
          <strong className="calories__goal">2000</strong>
        </p>
        <p className="meter__title">Calories</p>
      </div>
    </Fragment>
  );
};

export default CaloriesBalanceGraph;
