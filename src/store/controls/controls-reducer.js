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

    case "SET_REGION":
      return {
        ...state,
        region: action.region,
      };

    case "CLEAR_CONTROLS":
      return initialState;
    default:
      return state;
  }
};

export const setSearch = (search) => ({
  type: "SET_SEARCH",
  search,
});

export const setRegion = (region) => ({
  type: "SET_REGION",
  region,
});

export const setClear = () => ({
  type: "CLEAR_CONTROLS",
});
