export const selectCountriesInfo = (state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.countries.length,
});

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
  return value;
};
