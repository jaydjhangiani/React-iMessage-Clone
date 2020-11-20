import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://imessage-live.herokuapp.com/'
})

export default instance