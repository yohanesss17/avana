import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import listMenu from "./routes/dummy-menu.json"
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css';


const globalState = {
  menu: listMenu
}

// Reducer
const rootReducer = (state = globalState, action) => {
  if (action.type === 'HANDLE_TEST') {

    let tempMenu = []
    action.newMenu.forEach(element => {
      tempMenu.push(element)
    });
    // let temp_menu = action.newMenu
    return {
      menu: tempMenu
    }
  }
  return state;
}

// Store
const store = createStore(rootReducer);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
