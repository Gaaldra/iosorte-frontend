import React from 'react';
import Icon from '../../../assets/user.png';

function MeuPerfil({ user }) {

    return (
        <div className="container mt-5 d-flex justify-content-center text-dark">
            <div className="card p-4 mt-3 text-center" style={{ width: '18rem', padding: 0 }}>
                <h6 className="heading">Meu Perfil</h6>
                <div className="d-flex flex-row mt-2 justify-content-center ">
                    <div className="image mr-3"> <img src={Icon} className="rounded-circle" width="60" alt="Perfil" /> </div>
                </div>
                <hr className="line-color" />
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