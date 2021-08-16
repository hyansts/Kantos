import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CardGroup, Card } from 'react-bootstrap';

import '../services/api';
import './css/styles.css';

import api from '../services/api';//comunica com o backend

class Lanchonete extends Component {
    state = {
        feed: [], 
    };

    async componentDidMount(){
        const id = this.props.location.state.lanchonete;
        const response = await api.get('produtos/'+id+'/lanchonete');
        this.setState({feed: response.data});
    }

    render(){
        return (
            <main>
                <CardGroup className='col-md-5'>
                {
                    this.state.feed.map(pr => (          
                    <Card key={pr._id} >
                        <Card.Img variant="top" src={"http://localhost:3333/files/" + pr.imagem} />
                        <Card.Body>
                            <Card.Title>{pr.nome}</Card.Title>
                            <Card.Text>
                                    R$ {pr.preco.toLocaleString('pt-br', 
                                    { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cada
                                <br/>
                                {pr.categorias.join(", ")}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Adicionar ao carrinho</small>
                        </Card.Footer>
                    </Card>
                    ))}
                </CardGroup>
            </main>
        );
    }
}

export default Lanchonete;