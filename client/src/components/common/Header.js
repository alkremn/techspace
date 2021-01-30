import React from 'react';
import Avatar from '../Avatar';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user } = useSelector(state => state.auth);
  return (
    <div className='header'>
      <h1 className='header__left'>Tech Space</h1>
      <div className='header__right'>
        <span className='header__name'>{user.displayName}</span>
        <Avatar
          image={user.photoUrl}
          label={user.initials}
          size={35}
          borderColor='gray'
          alt='avatar'
        />
      </div>
    </div>
  );
};

export default Header;
