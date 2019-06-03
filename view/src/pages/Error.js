import React from "react";
import "../styles/error/_error.scss"
const Error = ({title}) => {
  return (
     <div className='error-container'>
      <i id="err-icon" class="fa fa-exclamation-circle" />
      <h1 className='error-title'>{title}</h1>
      <p className='error-detail'>Whatever is you're looking for is not found!</p>
     </div>
  );
};

export default Error;
