import React, { useState } from 'react';
import api from "../../../services/api";

function Login() {

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    function submitHandle(e) {
        e.preventDefault();
        api.post('/secret/access', {
            user: user,
            password: pass
        })
            .then(result => {
                localStorage.setItem('token', result.data.token)
                window.location.replace("adm/dashboard")
            })
            .catch(error => {
                alert(error.response ? error.response.data.message : error)
            })
    }

    return (
        <div className='container full-height'>
            <div className='row full-height'>
                <div className='box'>
                    <form onSubmit={submitHandle}>
                        <h5 className='title'>ADM</h5>
                        <input
                            className='input iTxt'
                            type='text'
                            name='user'
                            value={user}
                            placeholder='User'
                            onChange={e => setUser(e.target.value)} />
                        <input
                            className='input iTxt'
                            type='password'
                            name='pass'
                            value={pass}
                            placeholder='Pass'
                            onChange={e => setPass(e.target.value)} />
                        <button
                            className='input iBtn'
                            type='submit'>Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;