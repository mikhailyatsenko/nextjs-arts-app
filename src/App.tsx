import './App.css';
import React from 'react';
import ArtsLoader from './contatiners/ArtsLoader';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <ArtsLoader />
      </ErrorBoundary>
    </>
  );
};

export default App;
