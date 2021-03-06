import React from 'react';
import Avatar from './Avatar';

const shrinkDescription = (description, count) => {
  if (description.length > count) {
    const words = description.split(' ');
    let total = 0;
    for (let word in words) {
    }
    // console.log(words);
    return `${description.slice(0, count)}...`;
  }
  return description;
};

const Case = ({
  id,
  title,
  caseNumber,
  className,
  description,
  createdDate,
  createdBy,
  assignedTo,
  draggableProps,
  dragHandleProps,
  innerRef,
}) => {
  return (
    <li
      className={className}
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <Avatar label='AK' size={25} labelSize={12} />
      <h1 className='case__title'>{title}</h1>
      <span>{new Date(Number(createdDate)).toDateString()}</span>
      <p className='case__description'>{shrinkDescription(description, 100)}</p>
    </li>
  );
};

export default Case;
