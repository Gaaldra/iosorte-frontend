import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../../services/api";

function Cadastro() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({
        mensagem: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const validate = validateEmail(email)

        if(!name || name.length <= 1) return setAlerta({mensagem: 'Informe um nome válido'});
        if(!validate) return setAlerta({mensagem: 'Informe um email válido'});
        if(!password || password.length < 6) return setAlerta({mensagem: 'Necessário um senha maior'});
        api.post('auth/register', {
            name: name,
            password: password,
            email: email
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            window.location.href = '/dashboard'
        }).catch(err => {
            setAlerta({ mensagem: err.response.data.message})
        })
    }

    return (
        <div className="container">
            <div className='row align-items-center full'>
                <div className="box">
                    <form onSubmit={handleSubmit}>
                        <p className='title'>Cadastre-se</p>
                        <input
                            name='name'
                            className='input iTxt'
                            placeholder='Seu nome'
                            value={name}
                            autoComplete='off'
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            name='email'
                            className='input iTxt'
                            placeholder='Email'
                            value={email}
                            autoComplete='off'
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            name='password'
                            className='input iTxt'
                            placeholder='Senha'
                            type='password'
                            value={password}
                            autoComplete='off'
                            onChange={e => setPassword(e.target.value)}
                        />
                        <input
                            type='submit'
                            className='input iBtn'
                            value='Cadastrar' />
                    </form>
                    <p style={{marginBottom: '0', height: 24, color: 'red'}}>{alerta.mensagem}</p>
                    <br />
                    <p>Já possui uma conta? <Link to='/entrar'>Clique aqui para entrar</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Cadastro;

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }