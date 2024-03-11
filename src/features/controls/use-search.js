import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearch } from "../../store/controls/controls-selectros";
import { setSearch } from "../../store/controls/controls-reducer";

export const useSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return [search, handleSearch];
};
