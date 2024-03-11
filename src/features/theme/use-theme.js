import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "./theme-slice";

export const useTheme = () => {
  const theme = useSelector((state) => state.theme.themeColor);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const themeSwither = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  return [theme, themeSwither];
};
