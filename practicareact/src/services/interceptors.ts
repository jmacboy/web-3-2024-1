import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    withCredentials: true,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
})
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('error', error);
        if (error.response?.status === 401) {
            try {
                await axios.post('http://127.0.0.1:8000/api/token/refresh/', {},
                    { withCredentials: true }
                )
            } catch (authError) {
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                console.log("auth error", authError)
                return Promise.reject(authError)
            }
            return api.request(error.config)
        }

        return Promise.reject(error)
    });

export default api;