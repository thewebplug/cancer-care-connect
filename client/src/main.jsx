import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import rootReducer from '../store/index.js'
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";


const composeEnhancer =
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
          <Provider store={store}>

    <App />
    </Provider>
  </React.StrictMode>
)
