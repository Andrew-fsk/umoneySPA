import axios from 'axios';
import router    from "./router";

let api = new axios.create();

// start request
api.interceptors.request.use(config => {
    if (localStorage.getItem('access_token') ) {
        config.headers.authorization = 'Bearer ' + localStorage.getItem('access_token')
    }
    return config;
}, error => {})
// end request

api.interceptors.response.use( config => {
    return config
}, error => {
    if (error.response.data.message === 'Token has expired') {
        return axios.post('/api/auth/refresh', {}, {
            headers: {
                'authorization' : 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(result => {
            localStorage.setItem('access_token', result.data.access_token);

            error.config.headers.authorization = 'Bearer ' + result.data.access_token;

            return api.request(error.config);
        })
    }
});

export default api;
