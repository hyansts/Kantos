import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class CadastroProduto extends Component {
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
                                        <h2 class="text-center" id="titulocadastro">Cadastro de item</h2>                         
                                        <div class="form-group" id="cadastro">                     
                                            <label for="curso" id="logintexto"><b>Nome do item:</b></label>
                                            <input type="text" name="itemname" id="itemname" class="form-control"/>
                                            <p></p>
                                            <label for="curso" id="logintexto"><b>Descrição:</b></label>
                                            <textarea class="form-control" name="description" id="description" rows="3"></textarea>
                                            <p></p>
                                            <div>
                                                <label for="tags" id="logintexto"><b>Tags:</b></label>
                                                <div>
                                                    <span class="badge badge-success">Fresco</span>
                                                    <span class="badge badge-success">Vegano</span>
                                                </div>
                                                <p></p>
                                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                            </div>
                                            <p></p>
                                            <label for="exampleFormControlFile1"><b>Imagem:</b></label>
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1"/>
                                            <p></p>
                                            <label for="cpf" id="logintexto"><b>Preço:</b></label>
                                            <input type="text" name="price" id="price" class="form-control"/>
                                            <p></p>
                                        </div>
                                        
                                        <div class="row justify-content-center align-items-center">
                                        <br></br>
                                        <br></br>
                                        <input type="submit" name="submit" class="btn btn-info btn-lg" value="enviar"/>
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

export default CadastroProduto;