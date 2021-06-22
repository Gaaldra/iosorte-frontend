import React, { useState } from "react";
import api from '../../services/api';

export default function ForgotPassword() {

    const [reset, setReset] = useState(false);
    const [email, setEmail] = useState("");
    const [codigo, setCodigo] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({
        mensagem: "",
        cor: "red"
    });

    const getCod = (event) => {
        event.preventDefault();
        const validate = validateEmail(email)

        if (!validate) return setAlerta({ mensagem: 'Informe um email válido' });
        api.post('auth/forgot-password', {
            email: email
        }).then(response => {
            setReset(true)
            setAlerta({ mensagem: response.data.message, cor: "green"})
        }).catch(err => {
            setAlerta({ mensagem: err.response.data.message })
        })
    }

    const resetPass = (event) => {
        event.preventDefault();

        if(!password) return setAlerta({ mensagem: 'Informe sua senha', cor: 'red'});
        api.post('auth/reset-password', {
            email: email,
            token: codigo,
            password: password
        }).then(response => {
            setAlerta({mensagem: response.data.message, cor: "green"})
            setTimeout(() => window.location.href = "/entrar", 2000)
        }).catch(err => {
            setAlerta({mensagem: err.response.data.message, cor: "red"})
        })
        
    }

    return (
        <div className="container">
            <div className='row align-items-center full'>
                <div className="box">
                    {!reset ?
                        <form onSubmit={getCod}>
                            <p className='title'>Esqueci minha senha</p>

                            <input
                                name='email'
                                className='input iTxt'
                                placeholder='Seu email'
                                value={email}
                                autoComplete='off'
                                onChange={e => setEmail(e.target.value)}
                            />
                            <input
                                type='submit'
                                className='input iBtn'
                                value='Recuperar' />
                        </form> : <form onSubmit={resetPass}>
                            <p className='title'>Resetar a senha</p>
                            <input
                                name='codigo'
                                className='input iTxt'
                                placeholder='Seu código'
                                value={codigo}
                                autoComplete='off'
                                onChange={e => setCodigo(e.target.value)}
                            />
                            <input
                                name="password"
                                type="password"
                                className='input iTxt'
                                placeholder='Nova Senha'
                                value={password}
                                autoComplete='off'
                                onChange={e => setPassword(e.target.value)}
                            />
                            <input
                                type='submit'
                                className='input iBtn'
                                value='Trocar senha' />
                        </form>}
                    <p style={{ marginBottom: '0', height: 24, color: alerta.cor }}>{alerta.mensagem}</p>
                </div>
            </div>
        </div>
    )
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}