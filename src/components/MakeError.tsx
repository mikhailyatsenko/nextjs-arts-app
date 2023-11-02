import React, { useState } from 'react';

const MakeError = () => {
  const [error, setError] = useState(false);

  const throwError = () => {
    setError(true);
  };

  if (error) {
    throw new Error();
  }

  return (
    <button className="error-button" onClick={throwError}>
      Throw Error
    </button>
  );
};

export default MakeError;
