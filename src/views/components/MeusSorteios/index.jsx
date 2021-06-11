import React from 'react';
import moment from '../../../services/moment';

function MeusSorteios({ sorteios }) {
    return (
        <>
            {sorteios.length === 0 && <h1 style={{ color: 'white' }}>Você não possui sorteios</h1>}
            {sorteios.map(sorteio => {
                return (
                    <div key={sorteio._id} className='col my-2'>
                        <div className='card border-success' style={{ width: '18rem', padding: 0 }}>
                            <img src={sorteio.game.urlImage} className='card-img-top' alt='Jogo' />
                            <div className="card-body text-center">
                                {sorteio.active && <>
                                    <h5 className='card-title'>{sorteio.award}</h5>
                                    <p className='card-text'>{sorteio.game.name}</p>
                                    <button className='btn btn-success btn-lg' disabled>Participando</button>
                                    <p className='card-text'><small className='text-muted'>{moment(sorteio.drawDate).fromNow()}</small></p>
                                </>}
                                {!sorteio.active && <>
                                    <h5 className='card-title text-muted'>{sorteio.award}</h5>
                                    <p className='card-text text-muted'>{sorteio.game.name}</p>
                                    <p className='card-text mb-2 fw-bolder'>Ganhador: {sorteio.winner.name}</p>
                                    <button className='btn btn-secondary' disabled>Sorteado</button>
                                </>}
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default MeusSorteios;