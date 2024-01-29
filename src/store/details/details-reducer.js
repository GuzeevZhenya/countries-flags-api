const initialState = {
  error: null,
  loading: "idle",
  currentCountry: null,
  neighbors: [],
};

export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DETAILS/SET_LOADING": {
      return {
        ...state,
        error: null,
        status: "loading",
      };
    }

    case "DETAILS/SET_ERROR": {
      return {
        ...state,
        error: action.error,
        status: "rejected",
      };
    }
    case "DETAILS/SET_COUNTRY": {
      console.log(action.country);
      return {
        ...state,
        status: "received",
        currentCountry: action.country,
      };
    }

    case "DETAILS/CLEAR_DETAILS": {
      return initialState;
    }

    case "DETAILS/SET_NEIGHBORS": {
      return {
        ...state,
        neighbors: action.neighbors,
      };
    }

    default:
      return state;
  }
};

export const setLoading = () => ({
  type: "DETAILS/SET_LOADING",
});

export const setError = (err) => ({
  type: "DETAILS/SET_ERROR",
  err,
});

export const setCountry = (country) => ({
  type: "DETAILS/SET_COUNTRY",
  country,
});

export const clearDetails = () => ({
  type: "DETAILS/CLEAR_DETAILS",
});

export const setNeighbors = (neighbors) => {
  return {
    type: "DETAILS/SET_NEIGHBORS",
    neighbors,
  };
};

export const loadCountryByName =
  (name) =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());

    client
      .get(api.searchByCountry(name))
      .then(({ data }) => dispatch(setCountry(data[0])))
      .catch((err) => dispatch(setError(err.message)));
  };

export const loadNeighborsByBorder =
  (borders) =>
  (dispatch, _, { client, api }) => {
    client
      .get(api.filterByCode(borders))
      .then(({ data }) => dispatch(setNeighbors(data.map((el) => el.name))))
      .catch((err) => dispatch(setError(err.message)));
  };
