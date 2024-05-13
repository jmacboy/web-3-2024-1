import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/webproxy/',
    withCredentials: true,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
})
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('error',error);
        if (error.response?.status === 401) {
            let response;
            try {
                if(!localStorage.getItem('refresh_token')){
                    console.log("refresh token vacío")
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                    return Promise.reject(error)
                }
                response = await axios.post('http://127.0.0.1:3000/webproxy/token/refresh/', {
                    refresh: localStorage.getItem('refresh_token')
                })
            } catch (authError) {
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                console.log("auth error", authError)
                return Promise.reject(authError)
            }

            localStorage.setItem('access_token', response?.data.access)
            return api.request(error.config)
        }
        
        return Promise.reject(error)
    });

export default api;