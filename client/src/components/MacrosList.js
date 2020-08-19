import React from "react";
import classNames from "classnames";
import MacroDefinition from "./MacroDefinition";
import toElementsWithMappedProps from "../utils/toElementsWithMappedProps";

const MacrosList = ({ macros, className }) => {
  const toMacroDefinition = toElementsWithMappedProps(MacroDefinition);

  const macrosDefinitions = macros.map(toMacroDefinition);

  return (
    <dl className={classNames("macros__data", className)}>
      {macrosDefinitions}
    </dl>
  );
};

export default MacrosList;
