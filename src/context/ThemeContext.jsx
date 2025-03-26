import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
   // const [theme, setTheme] = useState("light");
   const [theme, setTheme] = useLocalStorageState("light", "theme");

   useEffect(() => {
      console.log("effect");
      if (theme === "light") {
         document.documentElement.classList.remove("dark-mode");
         document.documentElement.classList.add("light-mode");
      } else {
         document.documentElement.classList.remove("light-mode");
         document.documentElement.classList.add("dark-mode");
      }
   }, [theme]);

   const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
   };

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
      </ThemeContext.Provider>
   );
};

function useThemeContext() {
   const context = useContext(ThemeContext);
   if (context === undefined)
      throw new Error("Context used outside of provider");
   return context;
}
export { ThemeContextProvider, useThemeContext };
