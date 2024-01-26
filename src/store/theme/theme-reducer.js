const initialState = {
  mainTheme: "light",
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        mainTheme: action.theme,
      };

    default:
      return state;
  }
};

export const setTheme = (theme) => ({
  type: "SET_THEME",
  theme,
});
