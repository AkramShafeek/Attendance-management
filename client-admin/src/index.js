import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { persistentStore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={persistentStore}>
      <PersistGate loading={null} persistor={persistStore(persistentStore)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


