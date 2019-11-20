import axios from 'axios';
let baseURL = 'http://api.cat-shop.penkuoer.com';

export const GET = (url,params)=>{
    return axios.get(`${baseURL}${url}`,{params:params}).then((data)=>{
        return data;
    })
}

export const POST = (url,params)=>{
    return axios.post(`${baseURL}${url}`,params).then((data)=>{
        return data;
    })
}

export const TOKENGET = (url,token)=>{
    return axios({
		url:`${baseURL}${url}`,
		headers:{"authorization":"Bearer "+token},
		}).then((data)=>{
        return data;
    })
}

export const TOKENPOST = (url,params,token)=>{
    return axios({
		method:'post',
		url:`${baseURL}${url}`,
		params:params,
		headers:{"authorization":"Bearer "+token},
		}).then((data)=>{
        return data;
    })
}