import { rootReducer } from "./root-reducer";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import * as api from "../config";
import thunk from "redux-thunk";
import axios from "axios";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ client: axios, api }))
  )
);

// const composeEnhancers =
