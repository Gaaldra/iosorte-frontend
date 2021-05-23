import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

import Icon from '../../../assets/user.png';

function MeuPerfil() {

    const [user, setUser] = useState({});

    useEffect(() => {
        api.get('/user', {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setUser(res.data.user)
            })
            .catch(error => {
                if (error.response.message) return alert(error.response.message)
                alert('Ocorreu um erro buscando suas informações, tente novamente')
            })
    }, [])

    return (
        <div class="container mt-5 d-flex justify-content-center">
            <div class="card p-4 mt-3 text-center" style={{ width: '18rem', padding: 0 }}>
                <h6 class="heading">Meu Perfil</h6>
                <div class="d-flex flex-row mt-2 justify-content-center ">
                    <div class="image mr-3"> <img src={Icon} class="rounded-circle" width="60" alt="Perfil" /> </div>
                </div>
                <hr class="line-color" />
                <h5 className="card-title">
                    {user.name}
                </h5>
                <p className="card-text">
                    {user.email}
                </p>
            </div>
        </div>

    )
}

export default MeuPerfil;