import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Routes from './routes';
import LoginProvider from './components/Provider';

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Routes />
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
