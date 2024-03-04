const initialState = {
  search: "",
  region: "",
};

export const controlsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
};

export const setSearch = (search) => ({
  type: "SET_SEARCH",
  search,
});
