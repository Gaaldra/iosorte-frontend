import React, { useEffect, useState } from 'react';
import Loading from '../../loading';
import moment from '../../../services/moment';
import api from '../../../services/api';

function Sorteio() {
    const [sorteios, setSorteios] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        api.get('/draw/', {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => {
                setSorteios(data.data.draws);
                setLoad(false)
            })
            .catch(error => {
                if (!error.response) return alert('Oh no. Parece que algo deu erro. Tenta novamente mais tarde.')
                alert('Você será redirecionado')
                if (error.response.status === 401) return window.location.href = '/'
            });
    }, []);

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

    if (load)
        return (
            <>
                <Loading />
                <div class="modal" id='myModal' tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id='myInput'>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    return (
        <>

            {sorteios.length === 0 && <h1 style={{ color: 'white' }}>Não há sorteios por enquanto</h1>}
            {sorteios.map((sorteio) => {
                return (
                    <div key={sorteio._id} className='col my-2'>
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