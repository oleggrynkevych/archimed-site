import React from 'react';

function Logo(props) {
  let firstSlideTime = '16s';

  return (
    <div className='logo-company' >
      <img src={props.src} alt='Logo Company' />
    </div>
  );
}

export default Logo;