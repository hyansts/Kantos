import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class Login extends Component {
    state = {
        email: '',
        senha: '',
        invalido: '',
    };

    static contextType = LoginContext;

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault();
        const data = new URLSearchParams();
        data.append('email', this.state.email);
        data.append('senha', this.state.senha);
        const login = await api.post('/usuario/login', data);
        const {setToken} = this.context;
        if(login.data){
            setToken(login.data.id);
            this.props.history.push('/');
        }
        else this.setState({invalido: 'Usuário e senha inválidos'})
    }

    // async componentDidMount(){
    //     const id = this.props.location.state.lanchonete;
    //     const response = await api.get('produtos/'+id+'/lanchonete');
    //     this.setState({feed: response.data});
    // }

    render(){
        return (
            <>
            <Header />
            <main>
                <div id="login">
                    <div className="container mt-5" >
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <form id="login-form" className="form" onSubmit={this.handleSubmit}>
                                        <h3 className="text-center text-primary" >Entrar</h3>
                                        <div className="form-group mt-3">
                                            <label htmlFor="email" >E-mail:</label><br/>
                                            <input type="text" name="email" className="form-control"
                                            onChange={this.handleChange} value={this.state.email}
                                            placeholder='email@exemplo.com'
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="password" id="logintexto">Senha:</label><br/>
                                            <input type="password" name="senha" className="form-control"
                                            onChange={this.handleChange} value={this.state.senha}
                                            placeholder='******'
                                            />
                                            <span className="text-danger">{this.state.invalido}</span>
                                        </div>

                                        <h3 className="pt-3"></h3>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <div id="register-link" className="text-center">
                                                        <a href="/cadastro" className="btn">Cadastre-se</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 row justify-content-center">
                                                <button type="submit" className="btn btn-success col-md-6">
                                                    <h6 className="text-white">Confirmar</h6>
                                                </button>
                                            </div>
                                            <div className="col-md-12 mt-5">
                                                <div className="form-group">
                                                    <div className="text-center">
                                                        <a href="/cadastroLanchonete" className="btn text-primary">Dono de uma lanchonete?</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </>
        );
    }
}

export default Login;