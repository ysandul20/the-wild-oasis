import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useThemeContext } from "../context/ThemeContext";
// import { ThemeContext } from "../context/ThemeContext";

function ToggleMode() {
   const { theme, toggleTheme } = useThemeContext();
   console.log(theme);
   return (
      <ButtonIcon onClick={toggleTheme}>
         {theme === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
      </ButtonIcon>
   );
}

export default ToggleMode;
