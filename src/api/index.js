import axios from 'axios';
let baseURL = 'http://api.cat-shop.penkuoer.com';

export const GET = (url,params)=>{
    return axios.get(`${baseURL}${url}`,{params:params}).then((data)=>{
        return data;
    })
}