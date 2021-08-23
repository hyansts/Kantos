import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class RelatorioVendas extends Component {

    state = {
        feed: [],
        quantidade: [],
        linha: [],
        total: 0,
        entrega: 0,
        local: 0,
        startDate: '',
        endDate: '',
        produto: '',
        erro: '',
        token: this.context.token
    };

    static contextType = LoginContext;

    async componentDidMount() {
        try {
            const usuario = await api.get('/usuario/' + this.state.token + '/perfil');
            const lanchonete = await api.get('/lanchonete/' + usuario.data.email + '/info');
            const pedidos = await api.get('/vendas/' + lanchonete.data.nome_lanchonete );
            this.setState({ feed: pedidos.data }, () => {this.geraRelatorio()});
        }
        catch (e) {
            this.setState({ erro: 'Nenhum pedido encontrado' });
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    handleSubmit = async e => {
        e.preventDefault();
        try {
            const usuario = await api.get('/usuario/' + this.state.token + '/perfil');
            const lanchonete = await api.get('/lanchonete/' + usuario.data.email + '/info');
            const pedidos = await api.get('/vendas/' 
            + lanchonete.data.nome_lanchonete + '/' +
              this.state.startDate + '/' + this.state.endDate  );
            this.setState({ feed: pedidos.data }, () => { this.geraRelatorio() });
        }
        catch (e) {
            this.setState({ erro: 'Nenhum pedido encontrado' });
        }
    }

    geraRelatorio = () => {
        let nomes = [];
        let quantidade = [];
        let preco = [];
        let estoque = [];
        let entrega = 0;
        let local = 0;
        this.state.feed.map((pedido) => {
            pedido.produtos.map((pr) => {
                let indexNome = nomes.indexOf(pr.produto.nome);
                if (indexNome === -1 ) {
                    nomes.push(pr.produto.nome);
                    quantidade.push(pr.quantidade);
                    preco.push(pr.produto.preco);
                    estoque.push(pr.produto.quantidade);
                } else {
                    quantidade[indexNome] += pr.quantidade; 
                }
            })
            if(pedido.para_entrega) entrega += 1;
            else local += 1;
        })

        var total = 0;
        for (var i = 0; i < quantidade.length; i++) {
            total += quantidade[i] * preco[i];
        }

        let linha = [];
        nomes.forEach((e,i)=>{
            linha.push({
                nome: nomes[i],
                qtd: quantidade[i],
                preco: preco[i],
                estoque: estoque[i],
            });
        })
        this.setState({ total });
        this.setState({ entrega });
        this.setState({ local });
        this.setState({ linha: linha });
    }

    render(){
        return (
            <>
            <Header />
            <main>
                <h3 className="pt-5 no-print"></h3>
                <form className="form mt-5 no-print">
                    <div className="row form-group mx-3">
                        <div className="col-md-4">
                            <label htmlFor="startDate" >De:</label><br />
                            <input type="date" name="startDate" className="form-control"
                                onChange={this.handleChange} value={this.state.startDate}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="endDate" >Até:</label><br />
                            <input type="date" name="endDate" className="form-control"
                                onChange={this.handleChange} value={this.state.endDate}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <br />
                            <button onClick={this.handleSubmit}
                            className='btn btn-success form-control' >Enviar</button>
                        </div>
                    </div>
                </form>
                <table className="table table-striped mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Produto</th>
                            <th scope="col">Vendidos</th>
                            <th scope="col">Rentabilidade</th>
                            <th scope="col">Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.linha.map((pr,idx)=> (
                        <tr key={idx}>
                            <th scope="row">{idx+1}</th>
                            <td>{pr.nome}</td>
                            <td>{pr.qtd}</td>
                            <td>R$ {(pr.preco*pr.qtd).toLocaleString('pt-br',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</td>
                            <td>{pr.estoque}</td>   
                        </tr>
                        ))}
                        <tr>
                            <th scope="row">|</th>
                            <td>Total:</td>
                            <td>R${this.state.total.toLocaleString('pt-br',
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</td>
                            <td >Pedidos para entrega: {this.state.entrega}</td>
                            <td >Pedidos para o local: {this.state.local}</td>
                        </tr>
                    </tbody>
                </table>
                <span className="text-danger no-print">{this.state.erro}</span>
                <div className="row mt-4 no-print">
                    <div className="col-md-12 justify-content-center">
                        <button className="btn btn-primary col-md-12"
                                onClick={() => window.print()}>
                            <span className="text-white">Salvar Relatório</span>
                        </button>
                    </div>
                </div>
            </main>
            </>
        );
    }
}

export default RelatorioVendas;