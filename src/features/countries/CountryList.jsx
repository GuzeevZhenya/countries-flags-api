import { useSelector, useDispatch } from "react-redux";
import { List } from "../../components/List";
import { Card } from "../../components/Card";
import { selectRegion, selectSearch } from "../controls/controls-slice";

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  loadCountries,
  selectCountriesInfo,
  selectFilteredCountries,
} from "./countries-slice";
import { useEffect } from "react";

export const CountryList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { status, error, qty } = useSelector(selectCountriesInfo);
  const search = useSelector(selectSearch);
  const region = useSelector(selectRegion);
  const countries = useSelector((state) =>
    selectFilteredCountries(state, { search, region })
  );

  console.log(qty);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return (
    <>
      {error ? <h2>{error}</h2> : null}
      {status === "loading" && <h2>Loading...</h2>}
      {status === "received" && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: "Population",
                  description: c.population.toLocaleString(),
                },
                {
                  title: "Region",
                  description: c.region,
                },
                {
                  title: "Capital",
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
