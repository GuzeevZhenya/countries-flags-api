const initialState = {
  currentCountry: null,
  status: "idle",
  error: null,
  neighbors: [],
};

export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "details/SET_LOADING":
      return {
        ...state,
        status: "loading",
        error: null,
      };

    case "details/SET_ERROR":
      return {
        ...state,
        status: "rejected",
        error: action.error,
      };

    case "details/SET_COUNTRIES":
      return {
        ...state,
        status: "received",
        currentCountry: action.countries,
      };

    case "details/CLEAR_DETAILS":
      return {
        initialState,
      };

    case "details/SET_NEIGHBORS":
      return {
        ...state,
        neighbors: action.neighbors,
      };

    default:
      return state;
  }
};

export const setLoading = () => ({
  type: "details/SET_LOADING",
});

export const setError = (error) => ({
  type: "details/SET_ERROR",
  error,
});

export const setCountries = (countries) => ({
  type: "details/SET_COUNTRIES",
  countries,
});

export const clearDetails = () => ({
  type: "details/CLEAR_DETAILS",
});

export const setNeighbors = (neighbors) => {
  return {
    type: "details/SET_NEIGHBORS",
    neighbors,
  };
};

export const loadCountryByName =
  (name) =>
  (dispatch, _, { api, client }) => {
    dispatch(setLoading());
    client
      .get(api.searchByCountry(name))
      .then(({ data }) => dispatch(setCountries(data[0])))
      .catch((err) => dispatch(setError(err.message)));
  };

export const loadNeighborsByBorder =
  (borders) =>
  (dispatch, _, { api, client }) => {
    client
      .get(api.filterByCode(borders))
      .then(({ data }) => dispatch(setNeighbors(data.map((el) => el.name))))
      .catch((err) => dispatch(setError(err.message)));
  };
