import React, { Component } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import LoginContext from './Context';

import './Header.css';
import '../pages/css/styles.css';
import logo from '../assets/img/Logo_Ultima_Vetorizada.svg';
import login from '../assets/img/login.svg';
import camera from '../assets/camera.svg';
import api from '../services/api';//comunica com o backend


class Header extends Component {
    state = {
        usuario: {},
        logged: false,
        token: this.context.token
    };

  static contextType = LoginContext;

    async componentDidMount(){
      const token = this.state.token;
      if (token) {
        const usuario = await api.get('/usuario/' + token + '/perfil');
        this.setState({ usuario: usuario.data });
        this.setState({ logged: true })
      }
      else { this.setState({ logged: false }) }
    }

    handleLogOut = ()=> {
      const { setToken } = this.context;
      setToken(null);
      this.setState({ token: null });
    }

  render(){
    const logged = this.state.logged;
    let logBtn;
    let perfil;
    if(logged) { 
      logBtn = <Nav.Link key="loggedIn" href="/" onClick={this.handleLogOut}>Sair</Nav.Link>;
      perfil = <Nav.Link key="perfilNome" href="/">{this.state.usuario.nome}</Nav.Link>;
    } else {
      logBtn = <Nav.Link key="loggedOut" href="login">Login</Nav.Link>
    }

    return (
      <header id="main-header">
          <Navbar collapseOnSelect expand="lg" bg="light" fixed="top" className="shadow p-3 mb-5 bg-white rounded">
              <Navbar.Brand href="/" className="mx-3">
                  <img id="logo" src={logo} alt="Kantos"/>
                    KANTOS
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav>
                  <Nav.Link href="/" id="home-menu">Início</Nav.Link>
                  <Nav.Link href="mapa">Mapa</Nav.Link>
                  {perfil}
                  {logBtn}
                </Nav>
              </Navbar.Collapse>
          </Navbar>
      </header>
      );
    }
}

export default Header;