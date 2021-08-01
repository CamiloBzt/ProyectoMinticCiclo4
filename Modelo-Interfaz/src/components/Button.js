// import React from 'react';
// import './Button.css';
// import { Link } from 'react-router-dom';

// export function Button() {
//   return (
//     <Link to='sign-up'>
//       <button className='btn'>Sign Up</button>
//     </Link>
//   );
// }

import React, { useContext } from 'react';
import './Button.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import types from '../types/types';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const { user, dispatchUser } = useContext( UserContext );

  const history = useHistory();

  const handleClick = () => {
    
    if (user?.auth) {
      dispatchUser({type: types.logout});
      localStorage.removeItem( 'tasks' );
      history.push('/');
    }
    else {
      history.push('/Login');
    }

  };

  return (
    <div to='/Login' className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={ handleClick }
        type={type}
      >
        {children}
      </button>
    </div>
  );
};
