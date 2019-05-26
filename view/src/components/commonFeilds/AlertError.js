import React from 'react'

const AlertError = (props) => {
    const errors = props.errors;
    return (
        errors.length > 0 && <div className='alert alert-danger'>
            {errors.map((err, index) => <p key={index} > {err.detail}</p>)}
        </div>
    )
}

export default AlertError; 
