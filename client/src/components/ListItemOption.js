import React from 'react';

const ListItemOption = ({ id, text, active, action }) => {
  return (
    <button
      id={id}
      className={`categoryItem ${active ? 'active_category' : ''}`}
      onClick={e => action(e.target.id)}
    >
      {text}
    </button>
  );
};

export default ListItemOption;
