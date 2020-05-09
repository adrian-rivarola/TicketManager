import React from 'react';

export default function ListaErrores({ errors }) {
  return (
    <div className="ui error message user-form">
      <ul className="list">
        { errors.map(error => <li key={error}>{error}</li>) }
      </ul>
    </div>
  );
}