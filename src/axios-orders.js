import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-d867c.firebaseio.com/'
});

export default instance;

