import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router';
import LoginContext from '../components/Context';

import '../services/api';

import './css/styles.css';
import pici from '../assets/img/banner1.png';

import api from '../services/api';//comunica com o backend


class Login extends Component {
    state = {
        email: '',
        senha: '',
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
            console.log(login.data);
            this.props.history.push('/');
        }
        
    }

    // async componentDidMount(){
    //     const id = this.props.location.state.lanchonete;
    //     const response = await api.get('produtos/'+id+'/lanchonete');
    //     this.setState({feed: response.data});
    // }

    render(){
        return (
            <main>
                <div id="login">
                    <h3 className="text-center text-white pt-5">Login form</h3>
                    <div className="container" >
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <form id="login-form" className="form" onSubmit={this.handleSubmit}>
                                        <h3 className="text-center" id="logintexto">Login</h3>
                                        <div className="form-group">
                                            <label htmlFor="email" id="logintexto">E-mail:</label><br/>
                                            <input type="text" name="email" className="form-control"
                                            onChange={this.handleChange} value={this.state.email}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" id="logintexto">Senha:</label><br/>
                                            <input type="password" name="senha" className="form-control"
                                            onChange={this.handleChange} value={this.state.senha}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-info btn-md my-2">
                                                Entrar
                                            </button>
                                            <a href="/" className="mx-4" >Cadastro</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Login;