import './App.css';
import React from 'react';
import ArtsLoader from './contatiners/ArtsLoader';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <ArtsLoader />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
};

export default App;
