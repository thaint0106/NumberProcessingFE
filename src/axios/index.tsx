import axios from 'axios';
const instance = axios.create({baseURL: 'http://localhost:8000/api/'});
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instance