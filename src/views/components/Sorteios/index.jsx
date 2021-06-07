import React from 'react';
import moment from '../../../services/moment';
import api from '../../../services/api';

function Sorteio({ sorteios, setSorteios }) {

    async function drawJoin(drawId) {
        api.post(`/draw/join`,
            { id: drawId },
            {
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                alert(response.data.message)
                const items = sorteios.filter(item => item._id !== drawId)
                setSorteios(items)
            })
            .catch(error => {
                if (error.response.message) return alert(error.response.message);
                alert('Ocorreu um erro ao tentar participar do sorteio')
            })
    }

    return (
        <>
            {sorteios.length === 0 && <h1 style={{ color: 'white' }}>Não há sorteios por enquanto</h1>}
            {sorteios.map((sorteio) => {
                return (
                    <div key={sorteio._id} className='col mt-3'>
                        <div className='card border-success' style={{ width: '18rem', padding: 0 }}>
                            <img src={sorteio.game.urlImage} className='card-img-top' alt='Jogo' />
                            <div className="card-body text-center">
                                <h5 className='card-title'>{sorteio.award}</h5>
                                <p className='card-text'>{sorteio.game.name}</p>
                                {sorteio.active && <>
                                    <button className='btn btn-success btn-lg' onClick={() => drawJoin(sorteio._id)}>Participar</button>
                                    <p className='card-text'><small className='text-muted'>{moment(sorteio.drawDate).fromNow()}</small></p>
                                </>}
                                {!sorteio.active && <>
                                    <p className='card-text text-muted'>Ganhador</p>
                                    <button className='btn btn-success btn-lg' disabled>{sorteio.winner}</button>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Sorteio;