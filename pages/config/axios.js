import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000";
axios.interceptors.request.use(
    config => {
        if (config.url.includes("/login") || config.url.includes("/register")) return config
        const token = window.localStorage.getItem('acc_teken')
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    err => {
        Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if (err.response?.status === 401 && window.localStorage.getItem('acc_teken')) {
            window.localStorage.removeItem('acc_token')
            window.location.reload()
            alert({
                message: "Login again please"
            })
            return Promise.reject(err)
        }
        return Promise.reject(err)
    }
)

export default axios;