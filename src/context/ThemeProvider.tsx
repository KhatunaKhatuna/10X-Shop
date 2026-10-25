import { useEffect, type PropsWithChildren } from "react";
import { useLocalStorage } from "@/hooks";
import { STORAGE_KEYS } from "@/utils";
import { ThemeContext, type Theme } from "./ThemeContext";

/**
 * Provides theme state and toggle functionality to the entire application.
 * Synchronizes the active theme with localStorage and the HTML root element.
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEYS.THEME, "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
