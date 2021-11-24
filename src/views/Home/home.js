import React, { useState } from 'react'
// import Blob from '../../components/blob'
import Blob from '../../resources/Blob.svg'

import './home.css'
const Home = () => {
    const [qr, setQr] = useState('initialState')
    const [isAuthed, setIsAuthed] = useState(false)

    return (
        <header className='header'>
            <div className='qr-container'>
                {!isAuthed && (
                    <img src={qr} alt='qr code' width='300' height='200' />
                )}
            </div>

            <div className='blob' style={{ backgroundImage: `url(${Blob})` }}>
                <div className='text-blob'>
                    <p>
                        Crearemos una sesión virtual de tu Whatsapp web para así
                        poder enviar los mensajes que configures dentro de
                        backpro.
                    </p>
                </div>
            </div>
        </header>
    )
}

export default Home
