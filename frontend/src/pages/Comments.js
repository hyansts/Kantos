import React, { Component } from 'react';
import api from '../services/api';//comunica com o backend
import more from "../assets/more.svg";
import like from "../assets/like.svg";
import send from "../assets/send.svg";
import './Comments.css';
import io from 'socket.io-client';

class Comments extends Component {
    state = {
        post: {comments:[]},
        comment: '',
    };

    async componentDidMount() {
        
        const socket = io('http://localhost:3333');

        socket.on('like', likedPost => {
            this.setState({
                post: likedPost
            });
        });

        socket.on('comment', commentedPost => {
            this.setState({
                post: commentedPost
            });
        });

        const id = this.props.location.state.id;
        const response = await api.get('/posts/' + id + "/comments");
        this.setState({ post: response.data });

    }

    handleLike = id => {
        api.post('/posts/' + id + "/like")
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault();
        const data = new URLSearchParams();
        data.append('comment', this.state.comment);

        await api.post('/posts/' + this.state.post._id + '/comments', data);

    }

    validComment = (cm,i) => {
        if (cm !== null) return (<p className="comments" key={i}>{cm}</p>)
    }

    render(){
        return (
            <section id="post-list"> 
                <article key={this.state.post._id}>
                    <header>
                        <div className="user-info">
                            <span>{this.state.post.author}</span>
                            <span className="place">{this.state.post.place}</span>
                        </div>
                        <img src={more} alt="mais" />
                    </header>

                    <img src={"http://localhost:3333/files/" + this.state.post.image} width="300px" alt="" />
                    <footer>
                        <div className="actions">
                            <button type="button" onClick={() => this.handleLike(this.state.post._id)}>
                                    <img src={like} alt="" />
                            </button>
                            <img src={send} alt="" />
                        </div>
                        <strong>{this.state.post.likes} curtidas</strong>
                        <p>
                            {this.state.post.description}
                            <span>{this.state.post.hashtags}</span>
                        </p>
                        <form id="comment-form" onSubmit={this.handleSubmit}>
                            <input name="comment" placeholder="Escreve aqui seu comentário" 
                            onChange={this.handleChange} value={this.state.comment}></input>
                            <button type="submit">Enviar</button>
                        </form>
                        <div className="comments-container">
                            {this.state.post.comments.map((e, i) => this.validComment(e,i))}
                        </div>
                    </footer>
                </article>
            </section>
        );   
    }
}
export default Comments;