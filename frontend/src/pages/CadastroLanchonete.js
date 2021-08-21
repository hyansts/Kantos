import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class CadastroLanchonete extends Component {
    state = {
        email: '',
        senha: '',
        confirmarSenha: '',
        nome_lanchonete: '',
        nome: '',
        contato: '',
        endereco: '',
        horarioAbre: '',
        horarioFecha: '',
        image: null,
        erro: '',
    };

    static contextType = LoginContext;

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault();
        if(this.verificarSenha() === ''){
            const data = new FormData();
            data.append('email', this.state.email);
            data.append('senha', this.state.senha);
            data.append('nome_lanchonete', this.state.nome_lanchonete);
            data.append('nome', this.state.nome);
            data.append('contato', this.state.contato);
            data.append('endereco', this.state.endereco);
            data.append('horario', 
                this.state.horarioAbre + '-' + this.state.horarioFecha);
            data.append('image', this.state.image);
            const login = await api.post('/lanchonete', data);
            const {setToken} = this.context;
            if(login.data){
                setToken(login.data.id);
                this.props.history.push('/');
            } else {this.setState({erro: 'Os dados são inválidos ou esse usuário já existe'})}
        }
    }

    verificarSenha = () => {
       if (this.state.senha.length > 5) {
           if (this.state.senha === this.state.confirmarSenha) {
               return '';
           }
       }
       else return 'A senha está errada';
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
                                        <h3 className="text-center text-success" >Cadastre sua lanchonete</h3>
                                        <div className="form-group">
                                            <label htmlFor="email">E-mail:</label><br/>
                                            <input type="text" name="email" className="form-control"
                                            placeholder="email@exemplo.com" required
                                            onChange={this.handleChange} value={this.state.email}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="password">Senha:</label><br/>
                                            <input type="password" name="senha" className="form-control"
                                            minLength="6" placeholder="Mínino de 6 caracteres"
                                            onChange={this.handleChange} value={this.state.senha}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="confirmarSenha">Confirmar Senha:</label><br/>
                                            <input type="password" name="confirmarSenha" className="form-control"
                                            minLength="6" placeholder="Confirme sua senha"
                                            onChange={this.handleChange} value={this.state.confirmarSenha}
                                            />
                                            <span className="text-danger">{this.state.confirmarSenha.length > 5 && this.verificarSenha()}</span>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="nome">Nome Completo:</label><br />
                                            <input type="text" name="nome" className="form-control"
                                                placeholder="Como você se chama?" required
                                                onChange={this.handleChange} value={this.state.nome}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Imagem da Lanchonete:</label><br />
                                            <input type="file" className="form-control"
                                                onChange={this.handleImageChange} required
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="nome_lanchonete">Nome da lanchonete:</label><br/>
                                            <input type="text" name="nome_lanchonete" className="form-control"
                                            placeholder="Como sua lanchonete se chama?" required
                                            onChange={this.handleChange} value={this.state.nome_lanchonete}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="endereco">Localização da Lanchonete:</label><br />
                                            <input type="text" name="endereco" className="form-control"
                                                placeholder="Rua A, bloco 1, 123" required
                                                onChange={this.handleChange} value={this.state.endereco}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="contato">Contato:</label><br/>
                                            <input type="text" name="contato" className="form-control"
                                            placeholder="(85) 9999-9999" required
                                            onChange={this.handleChange} value={this.state.contato}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="horarioAbre">Horário de funcionamento:</label><br />
                                            <div className="row mt-2"> 
                                                <span className="col-md-2 text-center">Abre:</span>
                                                <div className="col-md-4">
                                                    <input type="time" name="horarioAbre" className="form-control "
                                                        min="07:00" max="22:00" required
                                                        onChange={this.handleChange} value={this.state.horarioAbre}
                                                    />
                                                </div>
                                                <span className="col-md-2 text-center">Fecha:</span>
                                                <div className="col-md-4">
                                                    <input type="time" name="horarioFecha" className="form-control col-md-5"
                                                        min="07:00" max="22:00" required
                                                        onChange={this.handleChange} value={this.state.horarioFecha}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="pt-3"></h3>
                                        <span className="text-danger">{this.state.erro}</span>
                                        <div className="row mt-4">
                                            <div className="col-md-12 row justify-content-center">
                                                <button type="submit" className="btn btn-success col-md-12">
                                                    <h6 className="text-white">Confirmar Cadastro</h6>
                                                </button>
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

export default CadastroLanchonete;