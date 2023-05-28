import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IntlProvider } from 'react-intl';
import localeEnMessages  from './locales/en';
import localeEsMessages from './locales/es';

const root = ReactDOM.createRoot(document.getElementById('root'));

const userLanguage = navigator.language || navigator.userLanguage;
const userLocale = userLanguage.substring(0, 2);

const locales = { 
  'en': localeEnMessages,
  'es': localeEsMessages
};

root.render(
  <IntlProvider locale={userLocale} messages={locales[userLocale]}>
    <App />
  </IntlProvider>
);
