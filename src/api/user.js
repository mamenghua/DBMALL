import * as API from './index';

export const login = (params)=>{
    return API.POST('/api/v1/auth/login',params);
}

export const register = (params)=>{
    return API.POST('/api/v1/auth/reg',params);
}

export const usermsg = (token)=>{
    return API.TOKENGET('/api/v1/users/info',token);
}