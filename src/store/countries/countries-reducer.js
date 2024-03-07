const initialState = {
  countries: [],
  status: "idle",
  error: null,
};

export const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COUNTRIES":
      return {
        ...state,
        countries: action.countries,
        status: "received",
      };

    case "SET_LOADING": {
      return {
        ...state,
        status: "loading",
        error: null,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        status: "rejected",
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export const setCountries = (countries) => {
  return {
    type: "SET_COUNTRIES",
    countries,
  };
};

export const setLoading = () => ({
  type: "SET_LOADING",
});

export const setError = (error) => ({
  type: "SET_ERROR",
  error,
});

export const countriesTC =
  () =>
  (dispatch, getState, { client, api }) => {
    dispatch(setLoading());
    client
      .get(api.ALL_COUNTRIES)
      .then(({ data }) => dispatch(setCountries(data)))
      .catch((err) => dispatch(setError(err.message)));
  };
