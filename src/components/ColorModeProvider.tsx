import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react"
import constants from "../constants";
import { ColorMode, ColorModeContext, ColorModes } from "../contexts/colorModeContext";
import { theme as themeJson } from "../themes";

const ColorModeProvider: React.FC = ({ children }) => {
  const darkModePref = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<ColorMode>(darkModePref ? "dark" : "light");
  
  const toggleColorMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem(constants.COLOR_MODE_LOCALE_STORAGE_KEY, newMode);
  }

  useEffect(() => {
    try {
      const storedMode = localStorage.getItem(constants.COLOR_MODE_LOCALE_STORAGE_KEY) as ColorMode;
      if (storedMode && ColorModes.includes(storedMode)) {
        console.debug("Set color mode from local storage");
        setMode(storedMode);
      }
    } catch (error) {
      console.error(`Could not retrieve color mode from local storage: 
                    ${(error as Error).message}`);
    }
  }, []);
  
  const theme = useMemo(() => {
    return createTheme(
      {...themeJson, ...{palette: {mode}}}
    );
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{mode, toggleColorMode}}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ColorModeProvider;
