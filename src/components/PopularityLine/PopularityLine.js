import React from 'react';

function PopularityLine({ popularity }) {
  return (
    <div>
      <i className='fas fa-user-circle'></i>
      <span> {Math.floor(popularity)}</span>
    </div>
  );
}

export default PopularityLine;
