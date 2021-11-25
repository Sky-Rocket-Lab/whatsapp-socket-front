import React, { useEffect, useState } from 'react'
import { socket } from '../../services/socket'
import { isUserValid } from '../../services/user'
import { useParams } from 'react-router-dom'

import Logo from '../../resources/backpro_logo.png'
import Blob from '../../resources/Blob.svg'
import './home.css'
const Home = () => {
    const [qr, setQr] = useState('initialState')
    const [isAuthed, setIsAuthed] = useState(false)
    const [user, setUser] = useState(undefined)

    let { userId } = useParams()

    useEffect(() => {
        isUserValid(userId)
            .then((res) => {
                console.log(res.data)
                setUser(res.data)
                connectToSocket(res.data)
            })
            .catch((e) => {
                console.error('error finding a user', e)
            })

        const connectToSocket = (user) => {
            if (user) {
                // Conectarse al cliente de wp
                socket.emit('connect-wp', user)

                // Escuchar evento qr
                socket.on('qr', (qr) => setQr(qr))

                socket.on('connected', () => {
                    console.log('user connected into the server')
                })

                socket.on('authenticated', (sessionToken) => {
                    socket.emit('save-session', {
                        idAsesor: user.idAsesor,
                        session: sessionToken,
                    })
                })

                socket.on('session-failed', (msg) => {
                    setIsAuthed(false)
                    console.error(msg)
                })

                socket.on('session-saved', (msg) => {
                    setIsAuthed(true)
                    console.error(msg)
                })
            }
        }
    }, [userId])

    return (
        <header className='header'>
            <div
                className='logo'
                style={{ backgroundImage: `url(${Logo})` }}></div>
            <h2 className='title'>
                {' '}
                Escanea el QR utilizando la app de Whatsapp
            </h2>
            <div className='qr-container'>
                {user && !isAuthed ? (
                    <img src={qr} className='qr' alt='qr code' />
                ) : (
                    <div className='qr'>
                        {!user && <h1>Buscando usuario...</h1>}

                        {user && isAuthed && <h1>scan exitoso</h1>}
                    </div>
                )}
            </div>

            <div className='blob' style={{ backgroundImage: `url(${Blob})` }}>
                <div className='text-blob'>
                    <p>
                        Crearemos una sesión virtual de tu Whatsapp web para
                        así, poder enviar los mensajes que configures dentro de
                        backpro.
                    </p>
                </div>
            </div>
        </header>
    )
}

export default Home
