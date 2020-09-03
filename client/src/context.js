import { useContext, createContext } from "react";

const context = createContext();
export default context;
export const { Provider } = context;
export const { Consumer } = context;
export const getContextValue = () => useContext(context);
