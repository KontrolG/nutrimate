import { useState } from "react";

const useToggle = initialState => {
  const [state, setState] = useState(initialState);
  const toggleState = () => setState(negateState);
  const negateState = currentState => !currentState;
  return [state, toggleState];
};

export default useToggle;
