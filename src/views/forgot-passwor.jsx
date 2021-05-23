import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPaswword() {
    return (<>
        <div className="container full-height">
            <div className='row align-items-center full-height'>
                <div className="box">
                    <form className="float-right" onSubmit={this.handleSubmit}>
                        <p className="title">Login</p>
                        <input
                            type="text"
                            placeholder="E-mail"
                            className="input iTxt"
                            name="email"
                            autoComplete='off'
                            onChange={this.handleInputChange}
                        />
                        <input type="submit"
                            value="Entrar"
                            className="input iBtn"
                        />
                    </form>
                    <br></br>
                    <p><Link to="/cadastrar">Voltar</Link></p>
                </div>
            </div>
        </div>
    </>)
}

export default ForgotPaswword;