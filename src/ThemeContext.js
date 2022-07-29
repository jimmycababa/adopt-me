import { createContext } from "react";

// green is the default value (a hook) that we never expect to be called but we are basically only doing it for TypeScript
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
