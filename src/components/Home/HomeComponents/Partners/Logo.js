import React from 'react';

function Logo(props) {
  return (
    <div className='logo-company'>
      <img src={props.src} alt='Logo Company' />
    </div>
  );
}

export default Logo;