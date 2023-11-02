import React from 'react';

const ErrorPage = () => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className="error-page">
      <h1>
        Something went wrong
        <button onClick={reloadPage}>Reload page</button>
      </h1>
    </div>
  );
};

export default ErrorPage;
