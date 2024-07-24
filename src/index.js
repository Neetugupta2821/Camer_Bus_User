import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { BrowserRouter } from "react-router-dom";

import './i18n'
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import frTraslation from '../src/location/FR/FR.json'
import gbTraslation from '../src/location/GB/GB.json'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
 


const resources = {
  FR: {
    translation: frTraslation,
  },
  GB: {
    translation: gbTraslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language'),
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <I18nextProvider i18n={i18next}> 
      <App />
    </I18nextProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
