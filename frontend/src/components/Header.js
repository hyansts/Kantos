import React, { Component } from 'react';
import {Navbar, NavDropdown, Nav} from 'react-bootstrap';
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
        let usuario = await api.get('/usuario/' + token + '/perfil');
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
    let menuLanchonete;
    if(logged) { 
      logBtn = <Nav.Link key="loggedIn" href="/" onClick={this.handleLogOut}>Sair</Nav.Link>;
      perfil = 
      <NavDropdown key="perfilNome" 
      title={this.state.usuario.nome.split(' ')[0]} >
        <NavDropdown.Item href="/">Meus pedidos</NavDropdown.Item>
        <NavDropdown.Item href="/perfil">Meu perfil</NavDropdown.Item>
      </NavDropdown>
      if(this.state.usuario?.tipo === 'gerente') {
        menuLanchonete = 
        <NavDropdown key="minhaLanchonete" title="Minha Lanchonete" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/">Gerenciar pedidos</NavDropdown.Item>
          <NavDropdown.Item href="/estoque">Meu estoque</NavDropdown.Item>
          <NavDropdown.Item href="produto">Cadastrar produto</NavDropdown.Item>
          <NavDropdown.Item href="/">Relatório de vendas</NavDropdown.Item>
        </NavDropdown>
      }
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
                  {menuLanchonete}
                  {logBtn}
                </Nav>
              </Navbar.Collapse>
          </Navbar>
      </header>
      );
    }
}

export default Header;