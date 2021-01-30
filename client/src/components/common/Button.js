import React from 'react';
import { Loader } from 'semantic-ui-react';

const Button = ({
  color,
  type,
  className,
  width,
  height,
  children,
  onClick,
  loading,
  inverted,
  titleColor,
  disabled,
}) => {
  return (
    <button
      className={`button ${className ? className : ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{
        background: `${color}`,
        color: titleColor,
        width: width,
        height: height,
      }}
    >
      {loading ? (
        <Loader className='buttonloader' inverted={inverted} active={loading} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
