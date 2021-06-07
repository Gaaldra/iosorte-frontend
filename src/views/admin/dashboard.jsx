import moment from 'moment';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Loading from '../loading';

function PortalAdm({ match }) {
    const [draws, setDraws] = useState([]);
    const [games, setGames] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        api.get('/secret/games', {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => {
            setGames(result.data.games)
            setLoad(true)
        }).catch(error => null);

        api.get('secret/draws', {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => {
            setDraws(result.data.draws)
            setLoad(true)
        }).catch(error => null);

    }, [])

    if (!load) return <Loading />

    return (
        <div className="accordion text-dark" id="accordionMain">
            <div className="accordion-item">
                <h2 className="accordion-header" id='headingOne'>
                    <button className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne">
                        Sorteios
                    </button>
                </h2>
                <div className="accordion-collapse collapse" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionMain">
                    <div className="accordion-body">
                        <button className="btn btn-success" onClick={() => window.location.replace('./add-draw')}><i className="fas fa-plus"></i></button>
                        <div className="row justify-content-around">
                            {draws.map(draw => {
                                const dateDraw = new Date(draw.drawDate)

                                console.log(dateDraw)
                                
                                return (
                                    <div key={draw._id} className='col my-2'>
                                        <div className='card border-success' style={{ width: '18rem', padding: 0 }}>
                                            <img src={draw.game.urlImage} className='card-img-top' alt='Jogo' />
                                            <div className="card-body text-center">
                                                <h5 className='card-title'>{draw.award}</h5>
                                                <p className='card-text'>{draw.game.name}</p>
                                                {draw.active && <>
                                                    <button className='btn btn-success btn-lg'>Sortear</button>
                                                    <p className='card-text text-muted'>{moment(draw.drawDate).fromNow()}</p>
                                                </>}
                                                {!draw.active && <>
                                                    <p className='card-text text-muted'>Ganhador: {draw.winner.name}</p>
                                                    <button className='btn btn-success btn-lg' disabled>{dateDraw.getDate()}</button>
                                                </>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id='headingTwo'>
                    <button className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo">
                        Games
                    </button>
                </h2>
                <div className="accordion-collapse collapse" id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionMain">
                    <div className="accordion-body">
                        <button className="btn btn-success" onClick={() => window.location.replace('./add-game')}><i className="fas fa-plus"></i></button>
                        <div className="row justify-content-around">
                            {games.map(game => {
                                return (
                                    <div key={game._id} className='col my-2'>
                                        <div className='card border-success' style={{ width: '18rem', padding: 0 }}>
                                            <img src={game.urlImage} className='card-img-top' alt='Jogo' />
                                            <div className="card-body text-center">
                                                <h5 className='card-title'>{game.name}</h5>
                                                <p className='card-text'>{game.description}</p>
                                                <button className='btn btn-success btn-lg'>Modificar</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortalAdm;