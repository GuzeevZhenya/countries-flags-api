const initialState = {
  themeColor: "light",
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_THEME":
      console.log(action);
      return {
        ...state,
        themeColor: action.payload,
      };

    default:
      return state;
  }
};

export const setTheme = (theme) => {
  console.log(theme);
  return {
    type: "SET_THEME",
    payload: theme,
  };
};
