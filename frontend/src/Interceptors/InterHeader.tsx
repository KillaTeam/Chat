import  axios  from 'axios';

export const request = axios.create({
    withCredentials:true,
    baseURL: process.env.REACT_APP_API_URL
})

request.interceptors.request.use(config =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})