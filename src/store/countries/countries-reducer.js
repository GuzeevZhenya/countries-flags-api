const initialState = {
  status: "idle",
  error: null,
  list: [],
};

export const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COUNTRIES": {
      return {
        ...state,
        status: "received",
        list: action.countries,
      };
    }
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

const setCountries = (countries) => ({
  type: "SET_COUNTRIES",
  countries,
});

const setLoading = () => ({
  type: "SET_LOADING",
});

const setError = (error) => ({
  type: "SET_ERROR",
  error,
});

export const loadCountries =
  () =>
  (dispatch, getState, { client, api }) => {
    dispatch(setLoading());

    client
      .get(api.ALL_COUNTRIES)
      .then(({ data }) => dispatch(setCountries(data)))
      .catch((err) => dispatch(setError(err.message)));
  };
