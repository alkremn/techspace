import React from 'react';
import Avatar from './Avatar';

const ChatMembersItem = ({ image, label, name }) => {
  return (
    <li className='chatMembersItem'>
      <Avatar image={image} label={label} size={40} />
      <p className='chatMembersItem__name'>{name}</p>
    </li>
  );
};

export default ChatMembersItem;
