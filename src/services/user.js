import axios from 'axios'
import { config } from './socket'

export const isUserValid = async (userId) => {
    const user = await axios({
        method: 'get',
        url: `${config.serverDomain}api/asesor/${userId}`,
        headers: {},
    })

    return user ? user : false
}
