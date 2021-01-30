import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { messages } from '../data/messages';
import ChatMessage from '../components/ChatMessage';
import ChatMembersItem from '../components/ChatMembersItem';
import InputEmoji from 'react-input-emoji';

function createName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const { users } = useSelector(state => state.users);

  const onEnterHandler = () => {
    messages.push({
      id: '4',
      senderId: '23423234',
      name: 'Ben Gold',
      message: message,
      timestamp: Date.now(),
      recieved: true,
    });
  };

  return (
    <div className='chatPage'>
      <div className='chat'>
        <div className='chat__messages'>
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        <div className='chat__form'>
          <InputEmoji
            value={message}
            onChange={setMessage}
            cleanOnEnter
            onEnter={onEnterHandler}
            placeholder='Type a message'
          />
        </div>
      </div>
      <div className='chatMembers'>
        <h1 className='chatMembers__title'>Members</h1>
        <ul className='chatMembers__list'>
          {users &&
            users
              .sort((a, b) => (b.lastName < a.lastName ? 1 : -1))
              .map(user => (
                <ChatMembersItem
                  image={user.photoUrl}
                  label={user.initials}
                  name={createName(user)}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
