import { Routes, Route } from 'react-router-dom'
import Home from './views/Home/home'

import './App.css'
function App() {
    // const [qr, setQr] = useState('')
    // const [isAuthed, setIsAuthed] = useState(false)

    // const handleMessage = (msg) => console.log(msg)

    // const sendMessage = () => {
    //     const number = '573044197396'

    //     const sessionToken = getSession()

    //     if (sessionToken) console.log('session token exist')

    //     let data = {
    //         number,
    //         message: 'Hello client! want some bitcoins?',
    //         sessionToken,
    //     }

    // axios({
    //     method: 'post',
    //     url: `${config.serverDomain}api/message`,
    //     data,
    //     headers: {
    //         id_asesor: 3,
    //     },
    // })
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
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/:userId' element={<Home />} />
            </Routes>
        </div>
    )
}

export default App
