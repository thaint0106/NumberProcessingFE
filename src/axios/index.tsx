import axios from 'axios';
const instance = axios.create({baseURL: 'https://localhost:44380/api/'});
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';

export default instance