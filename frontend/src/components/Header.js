import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';

import './Header.css';
import '../pages/css/styles.css';
import logo from '../assets/img/Logo_Ultima_Vetorizada.svg';
import login from '../assets/img/login.svg';
import camera from '../assets/camera.svg';

function Header() {
  return (
  <header id="main-header">
      <Navbar collapseOnSelect expand="lg" bg="light" fixed="top">
          <Navbar.Brand href="#home" className="mx-3">
              <img id="logo" src={logo} alt="Kantos"/>
                KANTOS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
            <Nav.Link href="#Home" id="home-menu">Início</Nav.Link>
              <Nav.Link href="#Mapa">Mapa</Nav.Link>
              <Nav.Link href="#Login">
              <img src={login} id="login-img" alt="Login" />
                Login
                </Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
  </header>
  );
}

export default Header;