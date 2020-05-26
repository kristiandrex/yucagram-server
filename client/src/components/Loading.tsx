import React from 'react';

export default function Loading() {
  return (
    <div className="d-flex h-100 w-100 align-items-center justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
}