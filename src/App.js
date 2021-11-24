import { useState, useEffect } from 'react'
import { socket, config } from './services/socket'
import axios from 'axios'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home/home'

import './App.css'
function App() {
    // const [qr, setQr] = useState('')
    // const [isAuthed, setIsAuthed] = useState(false)

    // const handleMessage = (msg) => console.log(msg)

    // useEffect(() => {
    //     // Conectarse al cliente de wp
    //     socket.emit('wp-connect', [])

    //     // Escuchar evento qr
    //     socket.on('qr', (qr) => setQr(qr))

    //     // Escuchar el evento de auth y recibir el token de sesion
    //     socket.on('authenticated', ({ sessionToken }) => {
    //         window.sessionStorage.setItem(
    //             'wpSessionToken',
    //             JSON.stringify(sessionToken)
    //         )

    //         setIsAuthed(true)

    //         socket.emit('save-session', {
    //             idAsesor: 1,
    //             session: sessionToken,
    //         })

    //         console.log(
    //             'user authenticated',
    //             window.sessionStorage.getItem('wpSessionToken')
    //         )
    //     })

    //     socket.on('message', (msg) => handleMessage(msg))

    //     socket.on('ready', (msg) => handleMessage(msg))

    //     socket.on('connected', () => {
    //         console.log('user connected into the server')
    //     })

    //     socket.on('session-failed', (msg) => {
    //         console.error(msg)
    //     })

    //     socket.on('session-saved', (msg) => {
    //         console.log(msg)
    //     })

    //     return function cleanUp() {
    //         socket.disconnect()
    //     }
    // }, [])

    // const sendMessage = () => {
    //     const number = '573044197396'

    //     const sessionToken = getSession()

    //     if (sessionToken) console.log('session token exist')

    //     let data = {
    //         number,
    //         message: 'Hello client! want some bitcoins?',
    //         sessionToken,
    //     }

    //     axios({
    //         method: 'post',
    //         url: `${config.serverDomain}api/message`,
    //         data,
    //         headers: {
    //             id_asesor: 3,
    //         },
    //     })
    // }

    // const saveSession = async () => {
    //     const session = getSession()
    //     const data = {
    //         session,
    //     }

    //     try {
    //         await axios({
    //             method: 'post',
    //             url: `${config.serverDomain}api/asesor/session`,
    //             data,
    //             headers: {
    //                 id_asesor: 3,
    //             },
    //         })
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // const getSession = () => {
    //     return JSON.parse(window.sessionStorage.getItem('wpSessionToken'))
    // }

    return (
        <div className='App'>
            <Home />
            <Routes>
                <Route path='/' exact element={Home} />
            </Routes>
        </div>
    )
}

export default App
