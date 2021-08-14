import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';
import logo from '../assets/img/Logo_Ultima_Vetorizada.svg';
import camera from '../assets/camera.svg';

function Header() {
  return (
  <header id="main-header">
      <div className="container" id="nav-container">
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
          <a className="navbar-brand" id="cortitulologo">
            <img id="logo" src={logo} alt="hDC Agency"/>
            KANTOS
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" 
          data-target="#navbar-links" aria-controls="navbar-links" 
          aria-expanded="false" aria-label="Toggle navigation" id="corbtncelular">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbar-links">
            <div className="navbar-nav">
              <a className="nav-item nav-link" id="home-menu" href="#">Home</a>
              <a className="nav-item nav-link" id="home-menu" href="#">Mapa</a>
              <a className="nav-item nav-link" src="img/login.svg" id="menu-btn" href="login.html">Login</a>             
            </div>
          </div>
        </nav>
      </div>
  </header>
  );
}

export default Header;