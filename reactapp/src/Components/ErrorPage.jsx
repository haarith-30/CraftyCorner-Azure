import React from 'react'
import './ErrorPage.css';
const ErrorPage = () => {
  return (
    <div className="error-page-body">
      <div className="error-box shadow rounded">
        <h4 className="error-text">
          Oops! Something Went Wrong
        </h4>
        <p className="text-secondary">Please try again later..</p>
        <img src="/alert.png" alt="Alert Icon" className="alert-img" />
      </div>
    </div>
  );
};

export default ErrorPage