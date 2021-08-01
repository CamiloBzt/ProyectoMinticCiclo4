import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Inscribe tu correo para recibir novedades y descuentos.
        </p>
        <p className='footer-subscription-text'>
          Podrás cancelar tu suscripción en cualquier momento.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribirse</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Sobre nosotros</h2>
            <Link to='/sign-up'>Cómo funciona</Link>
            <Link to='/'>Testimonios</Link>
            <Link to='/'>Trabaja con nosotros</Link>
            <Link to='/'>Inversores</Link>
            <Link to='/'>Terminos de servicio</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contactenos</h2>
            <Link to='/'>Contacto</Link>
            <Link to='/'>Soporte</Link>
            <Link to='/'>Destinos</Link>
            <Link to='/'>Patrocinadores</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Embajadores</Link>
            <Link to='/'>Agencia</Link>
            <Link to='/'>Influenciadores</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Redes sociales</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              TaskControl
              {/*<i class='fab fa-typo3' />*/}
            </Link>
          </div>
          <small class='website-rights'>Grupo 7</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
