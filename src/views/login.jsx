import './css/form.css';
import React, { Component } from "react"
import { Link } from 'react-router-dom';
import Api from '../services/api';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            response: '',
            color: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { email, pass } = this.state;
        if(!email) return this.setState({ response: 'Informe um email válido', color: 'red'});
        if(!pass) return this.setState({ response: 'Informe sua senha', color: 'red'});
        Api.post('auth/authenticate', {
            email: this.state.email,
            password: this.state.pass
        }).then((response) => {
            localStorage.setItem('token', response.data.token)
            window.location.href = '/dashboard'
        }).catch(error => {
            if(!error.response) return this.setState({ response: 'Erro interno, tente novamente mais tarde', color: 'orange'})
            this.setState({response: error.response.data.message, color: 'red'});
        })
    }

    render() {
        return (
            <>
                <div className="container full-height">
                    <div className='row align-items-center full-height'>
                        <div className="box">
                            <form className="float-right" onSubmit={this.handleSubmit}>
                                <p className="title">Login</p>
                                <input
                                    type="text"
                                    placeholder="E-mail"
                                    className="input iTxt"
                                    name="email"
                                    autoComplete='off'
                                    onChange={this.handleInputChange}
                                />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className="input iTxt"
                                    name="pass"
                                    onChange={this.handleInputChange}
                                />
                                <input type="submit"
                                    value="Entrar"
                                    className="input iBtn"
                                />
                            </form>
                            <p style={{marginBottom: '0', height: 24, color: this.state.color}}>{this.state.response}</p>
                            <br></br>
                            <p>Não tem conta? <Link to="/cadastrar">Cadastre-se aqui</Link></p>
                            <p>Esqueceu sua senha? <Link to='/'>Recupere aqui</Link></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;