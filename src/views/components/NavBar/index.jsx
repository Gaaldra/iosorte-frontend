import React from 'react';

function NavBar({ onButtonClick }) {

    const changePage = (event) => {
        let element = document.getElementById('active')
        element.classList.remove('active')
        element.id = ''
        event.target.classList.add('active')
        event.target.id = 'active'
        onButtonClick(event.target.value)
    }

    return (
        <ul className="nav nav-pills justify-content-center">
            <li className='nav-item mx-sm-1'>
                <button
                    className='nav-link text-white border active'
                    id='active'
                    value='0'
                    onClick={e => changePage(e)}>Sorteios</button>
            </li>
            <li className='nav-item mx-sm-1'>
                <button
                    className='nav-link text-white border'
                    value='1'
                    onClick={e => changePage(e)}>Tickets</button>
            </li>
            <li className='nav-item mx-sm-1'>
                <button
                    className='nav-link text-white border'
                    value='2'
                    onClick={e => changePage(e)}>Perfil</button>
            </li>
            <li className='nav-item mx-sm-1'>
                <button
                    className='nav-link text-white border'
                    value='3'
                    onClick={e => {
                        localStorage.removeItem('token')
                        changePage(e)
                    }}>Sair</button>
            </li>
        </ul>
    )
};

export default NavBar;