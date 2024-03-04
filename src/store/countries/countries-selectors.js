import { useSelector } from "react-redux";

export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.countries.length,
});

export const selectAllCountries = (state) => state.countries.countries;
