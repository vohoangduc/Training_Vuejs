import axios from 'axios'
const UNAUTHENTICATED = 401
const FORBIDDEN = 403
const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1',
    timeout: 1000 // default is `0` (millisecond)
})

// Add a request interceptor
client.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        const token = localStorage.getItem('access-token')
        let headers = {
            ...config.headers,
            'Content-type': 'application/json'
        }
        if (token) {
            headers = {
                ...headers,
                Authorization: token
            }
        }
        config.headers = headers
        return config
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error)
    }
)

// Add a response interceptor
client.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response) {
            let {
                data: { message }
            } = error.response

            if (message && Array.isArray(message)) {
                message = message.join(',')
            }

            if (message && typeof message === 'object') {
                return Promise.reject(error)
            }

            if (error.response.status === UNAUTHENTICATED) {
                localStorage.removeItem('access-token')
                window.location.href = '/login'
            }

            if (
                error.response.status === FORBIDDEN &&
                error.response.subString(0, 9) === 'FORBIDDEN'
            ) {
                console.log('Access denied')
            }

            if (
                error.response.status === 404
            ) {
                console.log('link not found')
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return Promise.reject(error)
        } else {
            // Something happened in setting up the request that triggered an Error
            if (axios.isCancel(error)) {
                console.warn('Request is canceled')
            }

            return Promise.reject(error)
        }
        return Promise.reject(error.response)
    }
)

export default client