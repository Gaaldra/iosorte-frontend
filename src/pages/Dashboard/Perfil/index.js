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
                <input value={user.name} className="card-title text-center" />
                <input value={user.email} className="card-text text-center" />
                <input placeholder="Sua senha" className="my-2 form-control text-center" />
                <button type='submit' className='btn btn-success'>Salvar</button>
            </div>
        </div>

    )
}

export default MeuPerfil;