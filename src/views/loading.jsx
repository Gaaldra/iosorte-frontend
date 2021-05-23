import './css/loading.css'
import React from 'react';
import nome from '../assets/logo1.png';
import trevo from '../assets/logo2.png';

function Loading() {
    return (
        <>
            <div className='loading-screen'>
                    <img src={nome} id='nome' alt='Logo' />
                    <img src={trevo} id='trevo' alt='Logo' />
            </div>
        </>
    )
}

export default Loading;