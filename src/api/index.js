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

export const SEARCHORDER = (url,token)=>{
    return axios({
    	url:`${baseURL}${url}`,
    	headers:{"authorization":"Bearer "+token},
    	}).then((data)=>{
        return data;
    })
}

export const TOKENGETORDER = (url,params,token)=>{
    return axios({
		url:`${baseURL}${url}`,
		params:params,
		headers:{"authorization":"Bearer "+token},
		}).then((data)=>{
        return data;
    })
}

export const TOKENPOST = (url,params,token)=>{
    return axios({
		method:'post',
		url:`${baseURL}${url}`,
		data:params,
		headers:{"authorization":"Bearer "+token},
		}).then((data)=>{
        return data;
    })
}

export const TOKENDEL = (url,token)=>{
    return axios({
		method:'delete',
		url:`${baseURL}${url}`,
		headers:{"authorization":"Bearer "+token},
		}).then((data)=>{
        return data;
    })
}