import React from "react";
import "../styles/error/_error.scss"
const Error = () => {
  return (
     <div className='error-container'>
      <i id="err-icon" class="fa fa-exclamation-circle" />
      <h1 className='error-title'>404 Not Found!</h1>
      <p className='error-detail'>Whatever is you're looking for is not found!</p>
     </div>
  );
};

export default Error;
