import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import {applyMiddleware, createStore} from 'redux';

import promisMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import reducer from './reducers'

const createStoreWidthMiddleware = applyMiddleware(
  promisMiddleware,
  reduxThunk
  )(createStore);

  ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWidthMiddleware(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
