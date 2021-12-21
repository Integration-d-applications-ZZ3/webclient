import { createContext } from "react";

export const ColorModes = ["light", "dark"] as const;
export type ColorMode = typeof ColorModes[number];

interface IColorModeContext {
  mode: ColorMode;
  toggleColorMode: () => void;
}
export const ColorModeContext = createContext<IColorModeContext>({
  mode: "light",
  toggleColorMode: () => {}
});
