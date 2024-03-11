import { Controls } from "../components/Controls";

import { CountryList } from "../features/countries/CountryList";

export const HomePage = () => {
  return (
    <>
      <Controls />
      <CountryList />
    </>
  );
};
