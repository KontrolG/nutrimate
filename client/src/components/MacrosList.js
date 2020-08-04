import React from "react";
import { v4 as getRandomKey } from "uuid";
import classNames from "classnames";
import MacroDefinition from "./MacroDefinition";

const MacrosList = ({ macros, className }) => {
  const toMacroDefinition = macro => (
    <MacroDefinition key={getRandomKey()} {...macro} />
  );
  const macrosDefinitions = macros.map(toMacroDefinition);

  return (
    <dl className={classNames("macros__data", className)}>
      {macrosDefinitions}
    </dl>
  );
};

export default MacrosList;
