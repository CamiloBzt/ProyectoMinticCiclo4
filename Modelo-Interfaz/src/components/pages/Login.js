import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { TaskContext } from '../../contexts/TaskContext';
import { useForm2 } from '../../hooks/useForm2';

import './Login.css';

export const Login = ({ history }) => {

  const { dispatchUser } = useContext( UserContext );
/* 
  const { dispatchTask } = useContext( TaskContext ); */

  const { formValues,
        handleInputChange,
        handleSubmitLogin,
        error } = useForm2({
    email: '',
    contraseña1: '',
  }, null, null, dispatchUser, history);

  const { email, contraseña1 } = formValues;

  
  return (
<div className="login__outside">
  <div className="login__container">
    <form className="login" onSubmit = { handleSubmitLogin }>
      <div className="login__avatar"></div>

    {
      error &&
          <div className="login__error">
          usuario y/o password incorrectos
        </div>
    }

   
      <div><h4>Por favor ingrese su usuario y contraseña</h4></div>

      <div className="login__field">
        <label className="login__label">Correo</label>
        <input
          type="email"
          id="email"
          className="login__input"
          name="email"
          value={ email }
          onChange= { handleInputChange }
          autoComplete="off"
          required
        />
      </div>
      <div className="login__field">
        <label htmlFor="" className="login__label">Contraseña</label>
        <input
          type="password"
          id="password"
          className="login__input"
          name="contraseña1"
          value={ contraseña1 }
          onChange={ handleInputChange }
          autoComplete="off"
          required
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
