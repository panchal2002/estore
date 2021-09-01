import React from 'react';
import './styles.scss';

const Button = ({ children, ...otherProps }) => {
  return (
    <button className="btn" id="cancelBtn" {...otherProps}>
      {children}
    </button>
  );
}

export default Button