import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-c8c2d.firebaseio.com/'
});

export default instance;

