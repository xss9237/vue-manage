import axios from './axios'

export const getMenu = (params) => {
    return axios.request({
        url: '/permission/getMenu',
        methods: 'get',
        data: params
    })
}
export const getData = () => {
    return axios.request({
        url: '/home/getData'
    })
}
export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}