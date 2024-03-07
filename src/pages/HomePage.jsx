import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { countriesTC } from "../store/countries/countries-reducer";

import { List } from "../components/List";
import { Card } from "../components/Card";
import { Controls } from "../components/Controls";
import { useEffect } from "react";
import {
  selectCountriesInfo,
  selectFilteredCountries,
} from "../store/countries/countries-selectors";
import {
  selectRegion,
  selectSearch,
} from "../store/controls/controls-selectros";

export const HomePage = () => {
  const navigate = useNavigate();
  const search = useSelector(selectSearch);
  const region = useSelector(selectRegion);
  const countries = useSelector((state) =>
    selectFilteredCountries(state, { search, region })
  );

  const { status, error, qty } = useSelector(selectCountriesInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!qty) {
      dispatch(countriesTC());
    }
  }, [qty, dispatch]);

  return (
    <>
      <Controls />
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
