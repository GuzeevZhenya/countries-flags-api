import { rootReducer } from "./root-reducer";
import { legacy_createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import * as api from "../config";
import { loadState, saveState } from "./local-store";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configurateStore = () => {
  const persistedState = loadState();
  const store = legacy_createStore(
    rootReducer,
    persistedState,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({ client: axios, api }))
    )
  );
  store.subscribe(() => {
    saveState(store.getState());
  });
  return store;
};
