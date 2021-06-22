import React, { useEffect, useState } from 'react';
import countDown from '../../../utils/countDown';

function MeusSorteios({ sorteios }) {
    return (
        <>
            {sorteios.length === 0 && <h1 style={{ color: 'white' }}>Você não possui sorteios</h1>}
            {sorteios.map(draw => {
                return (
                    Draw(draw)
                )
            })}
        </>
    )
}

export default MeusSorteios;

function Draw(draw) {

    const [timeLeft, setTimeLeft] = useState(countDown(draw.drawDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(countDown(draw.drawDate));
        }, 1000);
    });

    return (
        <div key={draw._id} className='col my-2'>
            <div className='card border-success' style={{ width: '18rem', padding: 0 }}>
                <img src={draw.game.urlImage} className='card-img-top' alt='Jogo' />
                <div className="card-body text-center">
                    {draw.active && <>
                        <h5 className='card-title'>{draw.award}</h5>
                        <p className='card-text'>{draw.game.name}</p>
                        <button className='btn btn-success btn-lg' disabled>Participando</button>
                        <p className='card-text'><small className='text-muted'>{timeLeft}</small></p>
                    </>}
                    {!draw.active && <>
                        <h5 className='card-title text-muted'>{draw.award}</h5>
                        <p className='card-text text-muted'>{draw.game.name}</p>
                        <p className='card-text mb-2 fw-bolder'>Ganhador: {draw.winner.name}</p>
                        <button className='btn btn-secondary' disabled>Sorteado</button>
                    </>}
                </div>
            </div>
        </div>
    )
}