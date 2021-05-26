import moment from 'moment';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function PortalAdm({ match }) {
    const [draws, setDraws] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        api.get('/secret/games', {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => setGames(result.data.games)).catch(error => alert(error));

        api.get('/draw', {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => setDraws(result.data.draws)).catch(error => alert(error));

    }, [])

    return (
        <div className="accordion" id="accordionMain">
            <div className="accordion-item">
                <h2 className="accordion-header" id='headingOne'>
                    <button className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne">
                        Sorteios
                    </button>
                </h2>
                <div className="accordion-collapse collapse show" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionMain">
                    <div className="accordion-body">
                        <button className="btn btn-success" onClick={() => window.location.replace('./add-draw')}><i className="fas fa-plus"></i></button>
                        <div className="row justify-content-around">
                            {draws.map(draw => {
                                return (
                                    <div key={draw._id} className='col my-2'>
                                        <div className='card border-success' style={{ width: '18rem', padding: 0 }}>
                                            <img src={draw.game.urlImage} className='card-img-top' alt='Jogo' />
                                            <div className="card-body text-center">
                                                <h5 className='card-title'>{draw.award}</h5>
                                                <p className='card-text'>{draw.game.name}</p>
                                                <button className='btn btn-success btn-lg'>Sortear</button>
                                                <p className='card-text text-muted'>{moment(draw.drawDate).fromNow()}</p>
                                                {!draw.active && <>
                                                    <p className='card-text text-muted'>Ganhador</p>
                                                    <button className='btn btn-success btn-lg' disabled>{draw.winner}</button>
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
        </div>
    )
}

export default PortalAdm;