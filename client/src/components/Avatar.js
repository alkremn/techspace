import React from 'react';

const Avatar = ({ image, alt, label, borderColor, size, labelSize }) => {
  return (
    <div
      className='avatar'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: borderColor,
      }}
    >
      {image ? (
        <img
          className='avatar__image'
          src={image}
          alt={alt}
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ) : (
        <p className='avatar__label' style={{ fontSize: `${labelSize}px` }}>
          {label}
        </p>
      )}
    </div>
  );
};

export default Avatar;
