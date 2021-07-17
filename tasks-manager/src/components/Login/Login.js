import React from 'react';
import './Login.css';

export const Login = () => {
  
    return (
        <div className="login__outside">
    <div className="login__container">
      <form action="#" className="login">
        <div className="login__avatar"></div>

    {/* <div className="login__error">
          usuario y/o password incorrectos
        </div> */}
        <div className="login__field">
          <label className="login__label">usuario</label>
          <input
            type="email"
            id="user"
            className="login__input"
          />
        </div>
        <div className="login__field">
          <label htmlFor="" className="login__label">password</label>
          <input
            type="password"
            id="password"
            className="login__input"
          />
        </div>
        <button type="submit" className="login__button">
          Ingresar
        </button>
      </form>
    </div>
  </div>
    )
}
