import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountries = createAsyncThunk(
  "@@countries/load=countries",
  async (_, { extra: { client, api } }) => {
    const data = await client.get(api.ALL_COUNTRIES);
    console.log(data);
    return data;
  }
);

const initialState = {
  status: "idle",
  error: null,
  countries: [],
};

const countrySlice = createSlice({
  initialState,
  name: "countries",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCountries.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(loadCountries.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload || action.meta.error;
    });
    builder.addCase(loadCountries.fulfilled, (state, action) => {
      console.log(action);
      state.status = "received";
      state.countries = action.payload.data;
    });
  },
});

export const countryReducer = countrySlice.reducer;

//selectros

export const selectCountriesInfo = (state) => {
  console.log(state.countries.countries);
  return {
    status: state.countries.status,
    error: state.countries.error,
    qty: state.countries.countries.length,
  };
};

export const selectAllCountries = (state) => state.countries.countries;

export const selectFilteredCountries = (
  state,
  { search = "", region = "" }
) => {
  const value = state.countries.countries.filter(
    (country) =>
      country.name.toLowerCase().startsWith(search.toLocaleLowerCase()) &&
      country.region.startsWith(region)
  );
  console.log(state.countries.countries);
  return value;
};
